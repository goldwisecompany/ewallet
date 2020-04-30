import React, {useState, useEffect} from 'react';
import firebase from '@react-native-firebase/app';
// import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
// import DeviceInfo from 'react-native-device-info';
import uuid from 'react-native-uuid';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  View,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {Button, ListItem, Text, Icon} from 'react-native-elements';
import Swiper from 'react-native-swiper';
import {web3, tronWeb, erc20Abi, bitbox} from '../../services/wallet';
import {colors, fonts} from '../../styles';
import {getPrice} from '../../services/api';
import {updateBlogs, registerUuid} from '../../actions/index';

const BCH = require('../../assets/BCH.png');
const BTC = require('../../assets/BTC.png');
const ETH = require('../../assets/ETH.png');
const TRX = require('../../assets/TRX.png');
const PRN = require('../../assets/imgPRN.png');
const USDT = require('../../assets/USDT.png');

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const WalletScreen = ({
  navigation,
  myWallets,
  current,
  currency,
  walletName,
  blogs,
  updateBlogsConnect,
  registerUuidConnect,
  phrase,
  uuidMobile,
}) => {
  const [balances, setBalances] = useState({
    PRN: '0',
    BTC: '0',
    BCH: '0',
    ETH: '0',
    TRX: '0',
    USDT: '0',
  });

  const [priceList, setPriceList] = useState({
    PRN: '0',
    BTC: '0',
    BCH: '0',
    ETH: '0',
    TRX: '0',
    USDT: '0',
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
    const unsubscribe = navigation.addListener('focus', payload => {
      setRefreshing(true);
    });
    return unsubscribe;
  }, [refreshing, navigation]);

  useEffect(() => {
    const fetchBlogArticles = async () => {
      try {
        const res = await fetch('http://pranceworld.site/api/blogs');
        const data = await res.json();
        updateBlogsConnect(data);
      } catch (error) {
        console.log(error);
        updateBlogsConnect([]);
      }
    };
    fetchBlogArticles();
  }, []);

  useEffect(() => {
    const firebaseSync = async () => {
      const uid = uuid.v4();
      registerUuidConnect(uid);

      firestore()
        .collection('user')
        .doc(uuidMobile || uid)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            firestore()
              .collection('user')
              .doc(uuidMobile || uid)
              .update({
                myWallets,
              })
              .then(() => {
                console.log('User added!');
              });
          } else {
            firestore()
              .collection('user')
              .doc(uuidMobile || uid)
              .set({
                myWallets,
              })
              .then(() => {
                console.log('User added!');
              });
          }
        });
    };
    firebaseSync();
  }, [])

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
      USDT: USDT,
    };
    return imageList[theCoin];
  };

  const getEthBalance = async () => {
    try {
      let ethBalance = '0';
      let trxBalance = '0';
      let bchBalance = '0';
      try {
        const [weiBalance, sunBalance, {balance}] = await Promise.all([
          web3.eth.getBalance(myWallets[current].ETH.address),
          tronWeb.trx.getBalance(myWallets[current].TRX.address),
          bitbox.Address.details(myWallets[current].BCH.address),
        ]);
        ethBalance = web3.utils.fromWei(weiBalance || '0', 'ether');
        trxBalance = tronWeb.fromSun(sunBalance.toString() || '0');
        bchBalance = balance;
      } catch (error) {
        console.log(error);
      }
      let btcSatoshiBalance = 0;

      try {
        const btcResponse = await fetch(
          `https://api.blockcypher.com/v1/btc/main/addrs/${
            myWallets[current].BTC.address
          }/balance`,
        );
        const data = await btcResponse.json();
        if (data && data.error) {
          throw new Error(data.error);
        }
        btcSatoshiBalance = data.balance;
      } catch (error) {
        btcSatoshiBalance = 0;
      }

      // TODO: Migrate to mainnet
      const prnTokenContract = new web3.eth.Contract(
        erc20Abi,
        '0x3A47a04217181D9a3994Dc0675f56A2132f0Aa2a', // Ropsten
      );

      let prnbalance = 0;
      try {
        prnbalance = await prnTokenContract.methods
          .balanceOf(myWallets[current].ETH.address)
          .call();
      } catch (error) {
        prnbalance = 0;
      }

      const usdtTokenContract = new web3.eth.Contract(
        erc20Abi,
        // '0x748805809ee80adf15ecf3ad80feb0c99bc27b4b', // Ropsten
        '0xdAC17F958D2ee523a2206206994597C13D831ec7', // Main
      );
      const usdtbalance =
        (await usdtTokenContract.methods
          .balanceOf(myWallets[current].ETH.address)
          .call()) || 0;

      const btcBalance = bitbox.BitcoinCash.toBitcoinCash(
        btcSatoshiBalance,
      ).toString();

      const prnBalance = bitbox.BitcoinCash.toBitcoinCash(
        prnbalance,
      ).toString();

      const usdtBalance = web3.utils.fromWei(usdtbalance || '0', 'Mwei');

      setBalances({
        ...balances,
        BCH: bchBalance,
        BTC: btcBalance,
        ETH: ethBalance,
        TRX: trxBalance,
        PRN: prnBalance,
        USDT: usdtBalance,
      });
      let priceData = [];
      try {
        priceData = await getPrice();
      } catch (error) {
        console.log(error);
      }
      if (priceData.length !== 0) {
        setPriceList({
          PRN: 0.1 * Number(prnBalance),
          BTC: Number(priceData[0][0].price_usd) * Number(btcBalance),
          BCH: Number(priceData[1][0].price_usd) * Number(bchBalance),
          ETH: Number(priceData[2][0].price_usd) * Number(ethBalance),
          TRX: Number(priceData[3][0].price_usd) * Number(trxBalance),
          USDT: Number(priceData[4][0].price_usd) * Number(usdtBalance),
        });
        setTotalPrice(
          (
            0.1 * Number(prnBalance) +
            Number(priceData[0][0].price_usd) * Number(btcBalance) +
            Number(priceData[1][0].price_usd) * Number(bchBalance) +
            Number(priceData[2][0].price_usd) * Number(ethBalance) +
            Number(priceData[3][0].price_usd) * Number(trxBalance) +
            Number(priceData[4][0].price_usd) * Number(usdtBalance)
          ).toFixed(2),
        );
      }
      try {
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
        console.log(error);
      }
    } catch (error) {
      console.log(error.message, 'error');
    }
    try {
      const res = await fetch('http://pranceworld.site/api/blogs');
      const data = await res.json();
      updateBlogsConnect(data);
    } catch (error) {
      console.log(error);
      updateBlogsConnect([]);
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
          balancePrice: (ratesList[currency] * priceList[item]).toFixed(2),
        })
      }
      bottomDivider
    />
  );

  console.log(blogs);

  return (
    <View style={styles.container}>
      {/* TODO: Banner */}
      <View style={styles.banner}>
        {blogs && blogs.length !== 0 && (
          <Swiper
            autoplay={true}
            autoplayTimeout={5}
            dotColor={colors.mainDark}
            activeDotColor={colors.mainLight}>
            {blogs.map(item => (
              <View style={styles.slide} key={item.id}>
                <Image
                  resizeMode="center"
                  style={styles.image}
                  source={{uri: item.originalImageUrl || item.image}}
                />
              </View>
            ))}
          </Swiper>
        )}
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
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginLeft: 20,
          }}>
          <Icon
            type="material-community"
            name="wallet"
            size={20}
            iconStyle={{marginTop: 5}}
          />
          <View style={{width: 20}} />
          <Text style={styles.subtitle}>{walletName[current]}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginRight: 15,
          }}>
          <Text style={styles.subtitle}>
            {`${toLocaleCurrency(totalPrice)} ${currency}`}
          </Text>
        </View>
      </View>
      <View style={styles.list}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={keyExtractor}
          data={['PRN', 'BTC', 'BCH', 'ETH', 'TRX', 'USDT']}
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
    flexDirection: 'row',
    height: 60,
  },
  titleStyle: {
    color: colors.mainLight,
  },
  title: {
    fontSize: 30,
  },
  subtitle: {
    fontSize: 24,
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
  image: {
    width: deviceWidth,
    height: '100%',
  },
});

const mapStateToProps = state => ({
  myWallets: state.wallet.myWallets,
  current: state.wallet.current,
  currency: state.wallet.currency,
  walletName: state.wallet.walletName,
  blogs: state.wallet.blogs,
  phrase: state.wallet.phrase,
  uuidMobile: state.wallet.uuid,
});

const mapDispatchToProps = {
  updateBlogsConnect: updateBlogs,
  registerUuidConnect: registerUuid,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WalletScreen);
