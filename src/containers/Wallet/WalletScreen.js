import React, {useState, useEffect} from 'react';
import {
  Alert,
  FlatList,
  Image,
  View,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {Button, ListItem, Text} from 'react-native-elements';
import Swiper from 'react-native-swiper';
import {web3, tronWeb, erc20Abi, bitbox} from '../../services/wallet';
import {colors, fonts} from '../../styles';
import {getPrice} from '../../services/api';

const BCH = require('../../assets/BCH.png');
const BTC = require('../../assets/BTC.png');
const ETH = require('../../assets/ETH.png');
const TRX = require('../../assets/TRX.png');
const PRN = require('../../assets/PRN.png');

const WalletScreen = ({navigation, myWallets, current, currency}) => {
  const [balances, setBalances] = useState({
    PRN: '0',
    BTC: '0',
    BCH: '0',
    ETH: '0',
    TRX: '0',
  });

  const [priceList, setPriceList] = useState({
    PRN: '0.1',
    BTC: '0',
    BCH: '0',
    ETH: '0',
    TRX: '0',
  });

  const [ratesList, setRatesList] = useState({
    CNY: 1,
    IDR: 1,
    INR: 1,
    JPY: 1,
    KRW: 1,
    MYR: 1,
    SGD: 1,
    TWD: 1,
    USD: 1,
  });

  const [totalPrice, setTotalPrice] = useState('0.00');

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    web3.eth.accounts.wallet.add(myWallets[current].ETH.privateKey);
    getEthBalance();
    // navigation.addListener('willFocus', payload => getEthBalance());
  }, [refreshing]);

  const onRefresh = () => {
    setRefreshing(true);
  };

  const keyExtractor = (item, index) => index.toString();

  const buttonList = [
    {
      title: 'Send',
      icon: 'arrow-upward',
      onPress: () => navigation.navigate('Send', {coin: 'PRN'}),
    },
    {
      title: 'Receive',
      icon: 'arrow-downward',
      onPress: () => navigation.navigate('Receive', {coin: 'PRN'}),
    },
    {
      title: 'Scan',
      icon: 'crop-free',
      onPress: () => navigation.navigate('Scanner'),
    },
  ];

  const renderImage = theCoin => {
    const imageList = {
      BCH: BCH,
      BTC: BTC,
      ETH: ETH,
      TRX: TRX,
      PRN: PRN,
    };
    return imageList[theCoin];
  };

  const getEthBalance = async () => {
    try {
      const [weiBalance, sunBalance] = await Promise.all([
        web3.eth.getBalance(myWallets[current].ETH.address),
        tronWeb.trx.getBalance(myWallets[current].TRX.address),
      ]);

      let btcResponse, bchResponse;
      try {
        btcResponse = await fetch(
          `https://api.blockcypher.com/v1/btc/main/addrs/${
            myWallets[current].BTC.address
          }/balance`,
        );
      } catch (error) {
        btcResponse = undefined;
      }

      try {
        bchResponse = await fetch(
          `https://bch-chain.api.btc.com/v3/address/${bitbox.Address.toLegacyAddress(
            myWallets[current].BCH.address,
          )}`,
        );
      } catch (error) {
        bchResponse = undefined;
      }

      let btcSatoshiBalance = 0;
      let bchSatoshiBalance = 0;
      if (btcResponse !== undefined) {
        const {balance} = await btcResponse.json();
        btcSatoshiBalance = balance;
      }

      if (bchResponse !== undefined) {
        const {data} = await bchResponse.json();
        if (data) {
          const balance = data.balance;
          bchSatoshiBalance = balance;
        }
      }

      const tokenContract = new web3.eth.Contract(
        erc20Abi,
        '0x3A47a04217181D9a3994Dc0675f56A2132f0Aa2a',
      );
      const prnbalance =
        (await tokenContract.methods
          .balanceOf(myWallets[current].ETH.address)
          .call()) || 0;

      const ethBalance = web3.utils.fromWei(weiBalance || '0', 'ether');
      const trxBalance = tronWeb.fromSun(sunBalance.toString() || '0');
      const btcBalance = bitbox.BitcoinCash.toBitcoinCash(
        btcSatoshiBalance,
      ).toString();

      const bchBalance = bitbox.BitcoinCash.toBitcoinCash(
        bchSatoshiBalance,
      ).toString();

      const prnBalance = bitbox.BitcoinCash.toBitcoinCash(
        prnbalance,
      ).toString();
      setBalances({
        ...balances,
        BCH: bchBalance,
        BTC: btcBalance,
        ETH: ethBalance,
        TRX: trxBalance,
        PRN: prnBalance,
      });
      const priceData = await getPrice();
      if (priceData.length !== 0) {
        setPriceList({
          PRN: 0.1 * Number(prnBalance),
          BTC: Number(priceData[0][0].price_usd) * Number(btcBalance),
          BCH: Number(priceData[1][0].price_usd) * Number(bchBalance),
          ETH: Number(priceData[2][0].price_usd) * Number(ethBalance),
          TRX: Number(priceData[3][0].price_usd) * Number(trxBalance),
        });
        setTotalPrice(
          (
            0.1 * Number(prnBalance) +
            Number(priceData[0][0].price_usd) * Number(btcBalance) +
            Number(priceData[1][0].price_usd) * Number(bchBalance) +
            Number(priceData[2][0].price_usd) * Number(ethBalance) +
            Number(priceData[3][0].price_usd) * Number(trxBalance)
          ).toFixed(2),
        );
      }
      const currencyResponse = await fetch(
        'https://www.freeforexapi.com/api/live?pairs=USDCNY,USDIDR,USDINR,USDJPY,USDKRW,USDMYR,USDSGD,USDTWD,USDUSD',
      );
      const {rates} = await currencyResponse.json();
      let newRates = {};
      Object.keys(rates).forEach(key => {
        newRates[key.substring(3, 6)] = rates[key].rate;
      });
      setRatesList(newRates);
    } catch (error) {
      console.log(error.message, 'error');
    }
    setRefreshing(false);
  };

  const toLocaleCurrency = price => (ratesList[currency] * price).toFixed(2);

  const renderItem = ({item}) => (
    <ListItem
      title={item}
      leftIcon={<Image style={styles.icon} source={renderImage(item)} />}
      rightTitle={
        <View style={styles.rightTitleContainer}>
          <Text style={styles.rightTitle}>{`${balances[item]} ${item}`}</Text>
          <Text style={styles.rightTitle}>
            {`${toLocaleCurrency(priceList[item])} ${currency}`}
          </Text>
        </View>
      }
      onPress={() =>
        navigation.navigate('TransactionHistory', {
          coin: item,
          balance: balances[item],
          balancePrice: (
            ratesList[currency] *
            priceList[item] *
            Number(balances[item])
          ).toFixed(2),
        })
      }
      bottomDivider
    />
  );

  return (
    <View style={styles.container}>
      {/* TODO: Banner */}
      <View style={styles.banner}>
        <Swiper
          autoplay={true}
          autoplayTimeout={5}
          dotColor={colors.mainDark}
          activeDotColor={colors.mainLight}>
          <View style={styles.slide}>
            <Text style={styles.text}>1</Text>
          </View>
          <View style={styles.slide}>
            <Text style={styles.text}>2</Text>
          </View>
          <View style={styles.slide}>
            <Text style={styles.text}>3</Text>
          </View>
        </Swiper>
      </View>
      <View style={styles.buttonWrapper}>
        {buttonList.map(item => (
          <Button
            key={item.title}
            title={item.title}
            type="clear"
            buttonStyle={styles.buttonStyle}
            icon={{name: item.icon, color: colors.mainLight}}
            onPress={item.onPress}
            titleStyle={styles.titleStyle}
          />
        ))}
      </View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>
          {`${toLocaleCurrency(totalPrice)} ${currency}`}
        </Text>
      </View>
      <View style={styles.list}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={keyExtractor}
          data={['PRN', 'BTC', 'BCH', 'ETH', 'TRX']}
          renderItem={renderItem}
          scrollEnabled={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  banner: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  buttonStyle: {
    paddingVertical: 10,
    width: 100,
    margin: 10,
  },
  titleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: colors.mainLight,
  },
  title: {
    fontSize: 30,
  },
  list: {
    flex: 1,
  },
  rightTitleContainer: {
    width: 200,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  rightTitle: {
    color: colors.mainDark,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.mainLightTrans,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttonText: {
    color: colors.mainLight,
    fontSize: 50,
  },
  icon: {
    width: 40,
    height: 40,
  },
});

const mapStateToProps = state => ({
  myWallets: state.wallet.myWallets,
  current: state.wallet.current,
  currency: state.wallet.currency,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WalletScreen);
