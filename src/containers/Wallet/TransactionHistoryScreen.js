import React, {useState, useEffect} from 'react';
import {FlatList, Image, RefreshControl, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Button, ListItem, Text} from 'react-native-elements';
import {colors} from '../../styles';
import firestore from '@react-native-firebase/firestore';
import {web3, tronWeb, bitbox} from '../../services/wallet';

const BCH = require('../../assets/BCH.png');
const BTC = require('../../assets/BTC.png');
const ETH = require('../../assets/ETH.png');
const TRX = require('../../assets/TRX.png');
const PRN = require('../../assets/PRN.png');
const USDT = require('../../assets/USDT.png');

const TransactionHistoryScreen = ({
  navigation,
  route,
  myWallets,
  phrase,
  current,
  currency,
  uuidMobile,
}) => {
  const coin = (route.params && route.params.coin) || 'PRN';
  const [refreshing, setRefreshing] = useState(false);
  const [transactionList, setTransactionList] = useState([]);

  const buttonList = [
    {
      title: 'Send',
      icon: 'arrow-upward',
      onPress: () => navigation.navigate('Send', {coin: coin}),
    },
    {
      title: 'Receive',
      icon: 'arrow-downward',
      onPress: () => navigation.navigate('Receive', {coin: coin}),
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

  useEffect(() => {
    const fetchTransaction = async () => {
      let mappingData = {};
      try {
        const documentSnapshot = await firestore()
          .collection('user')
          .doc('txdata')
          .get();
        if (documentSnapshot.exists) {
          mappingData = documentSnapshot.data();
        }
      } catch (error) {
        console.log(error);
      }
      // .then(documentSnapshot => {
      //   console.log('User exists: ', documentSnapshot.exists);
      //   if (documentSnapshot.exists) {
      //     console.log('User data: ', documentSnapshot.data());
      //   }
      // });
      const mappingHash =
        mappingData && mappingData.tx && mappingData.tx[route.params.coin];
      try {
        if (route.params.coin === 'ETH') {
          const response = await fetch(
            `https://api.etherscan.io/api?module=account&action=txlist&address=${
              myWallets[current].ETH.address
            }&startblock=0&endblock=99999999&sort=asc&apikey=P2ZMGHA8ME6ZQXMAHDNWSFZMG7U322VW8N`,
          );
          const {result} = await response.json();
          const newList = await Promise.all(
            result
              .map(item => ({
                ...item,
                value: Number(web3.utils.fromWei(item.value)).toFixed(4),
                date: new Date(Number(item.timeStamp) * 1000).toLocaleString(),
                status:
                  item.from === myWallets[current].ETH.address
                    ? 'Send'
                    : 'Receive',
                note: (mappingHash && mappingHash[item.hash]) || '',
              }))
              .filter((_, index) => index < 30),
          );
          setTransactionList(newList.reverse());
        } else if (route.params.coin === 'BTC') {
          const response = await fetch(
            `https://chain.api.btc.com/v3/address/${
              myWallets[current].BTC.address
            }/tx`,
          );
          const {data} = await response.json();
          if (data !== null) {
            const {list} = data;
            if (list.length > 0) {
              const newList = list
                .filter((item, index) => index < 10)
                .map(i => {
                  const findInputIndex = i.inputs.findIndex(
                    inputItem =>
                      inputItem.prev_addresses[0] ===
                      myWallets[current].BCH.address,
                  );

                  const findOutputIndex = i.outputs.findIndex(
                    outputItem =>
                      outputItem.addresses[0] ===
                      myWallets[current].BCH.address,
                  );

                  let finalValue = 0;

                  finalValue =
                    ((i.outputs[findOutputIndex] &&
                      i.outputs[findOutputIndex].value) ||
                      0) -
                    ((i.inputs[findInputIndex] &&
                      i.inputs[findInputIndex].prev_value) ||
                      0);

                  return {
                    ...i,
                    date: new Date(i.block_time * 1000).toLocaleString(),
                    value: bitbox.BitcoinCash.toBitcoinCash(finalValue),
                    status: finalValue > 0 ? 'Receive' : 'Send',
                    from: i.inputs[0].prev_addresses[0] || 'mining',
                    to: i.outputs[0].addresses[0],
                    note: (mappingHash && mappingHash[i.hash]) || '',
                  };
                });
              setTransactionList(newList);
            }
          }
        } else if (route.params.coin === 'TRX') {
          const res = await fetch(
            `https://apilist.tronscan.org/api/transaction?sort=-timestamp&count=true&limit=30&start=0&address=${
              myWallets[current].TRX.address
            }`,
          );
          const {data} = await res.json();
          const txsList = await Promise.all(
            data
              .filter(item => item.contractType === 1)
              .map(item => ({
                ...item,
                date: new Date(item.timestamp).toLocaleString(),
                from: item.ownerAddress,
                to: item.toAddress,
                value: tronWeb.fromSun(
                  (item.contractData && item.contractData.amount) || '0',
                ),
                status:
                  item.ownerAddress === myWallets[current].TRX.address
                    ? 'Send'
                    : 'Receive',
                note: (mappingHash && mappingHash[item.hash]) || '',
              })),
          );
          setTransactionList(txsList);
        } else if (route.params.coin === 'BCH') {
          const legacyAddress = bitbox.Address.toLegacyAddress(
            myWallets[current].BCH.address,
          );
          const res = await fetch(
            `https://bch-chain.api.btc.com/v3/address/${legacyAddress}/tx`,
          );
          const {data} = await res.json();
          if (data !== null) {
            const {list} = data;
            if (list.length > 0) {
              const newList = list
                .filter((item, index) => index < 10)
                .map(i => {
                  const findInputIndex = i.inputs.findIndex(
                    inputItem =>
                      inputItem.prev_addresses[0] ===
                      myWallets[current].BCH.address,
                  );

                  const findOutputIndex = i.outputs.findIndex(
                    outputItem =>
                      outputItem.addresses[0] ===
                      myWallets[current].BCH.address,
                  );

                  let finalValue = 0;

                  finalValue =
                    ((i.outputs[findOutputIndex] &&
                      i.outputs[findOutputIndex].value) ||
                      0) -
                    ((i.inputs[findInputIndex] &&
                      i.inputs[findInputIndex].prev_value) ||
                      0);

                  return {
                    ...i,
                    date: new Date(i.block_time * 1000).toLocaleString(),
                    value: bitbox.BitcoinCash.toBitcoinCash(finalValue),
                    status: finalValue > 0 ? 'Receive' : 'Send',
                    from: i.inputs[0].prev_addresses[0] || 'mining',
                    to: i.outputs[0].addresses[0],
                    note: (mappingHash && mappingHash[i.hash]) || '',
                  };
                });
              setTransactionList(newList);
            }
          }
        } else if (route.params.coin === 'PRN') {
          // TODO: Migration to mainnet
          const address = myWallets[current].PRN.address;
          const res = await fetch(
            `https://api-ropsten.etherscan.io/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=999999999&sort=asc&apikey=P2ZMGHA8ME6ZQXMAHDNWSFZMG7U322VW8N`,
          );
          const data = await res.json();
          const {result} = data;
          if (result.length > 0) {
            const newList = result
              .filter(item => item.tokenName === 'prnc') // TODO: change name
              .map(tx => ({
                ...tx,
                status:
                  tx.from.toLowerCase() === address.toLowerCase()
                    ? 'Send'
                    : 'Receive',
                date: new Date(tx.timeStamp * 1000).toLocaleString(),
                value: bitbox.BitcoinCash.toBitcoinCash(
                  Number(tx.value),
                ).toFixed(4),
                note: (mappingHash && mappingHash[tx.hash]) || '',
              }));
            setTransactionList(newList);
          }
        } else if (route.params.coin === 'USDT') {
          const address = myWallets[current].USDT.address;
          const res = await fetch(
            `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=999999999&sort=asc&apikey=P2ZMGHA8ME6ZQXMAHDNWSFZMG7U322VW8N`,
          );
          const data = await res.json();
          const {result} = data;
          if (result.length > 0) {
            const newList = result
              .filter(item => item.tokenName === 'Tether USD')
              .map(tx => ({
                ...tx,
                status:
                  tx.from.toLowerCase() === address.toLowerCase()
                    ? 'Send'
                    : 'Receive',
                date: new Date(tx.timeStamp * 1000).toLocaleString(),
                value: bitbox.BitcoinCash.toBitcoinCash(
                  Number(tx.value),
                ).toFixed(4),
                note: (mappingHash && mappingHash[tx.hash]) || '',
              }));
            setTransactionList(newList);
          }
        }
      } catch (error) {
        console.log(error);
      }
      setRefreshing(false);
    };
    fetchTransaction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshing]);

  const keyExtractor = (item, index) => index.toString();

  const onRefresh = () => {
    setRefreshing(true);
  };

  const renderItem = ({item}) => (
    <ListItem
      title={
        <View style={{height: 120}}>
          <View style={styles.itemCol}>
            <Text style={{fontSize: 16}}>{item.date}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={styles.itemCol}>
              <Text style={{fontSize: 16}}>{item.status}</Text>
            </View>
            <View style={styles.coin}>
              <Text style={{fontSize: 16}}>{`${item.value} ${
                route.params.coin
              }`}</Text>
            </View>
          </View>
          <View style={styles.itemCol}>
            <Text>{item.status === 'Send' ? item.to : item.from}</Text>
          </View>
          <View style={styles.itemCol}>
            <Text style={{color: colors.mainDark}}>{`Note: ${item.note}`}</Text>
          </View>
        </View>
      }
      contentContainerStyle={{margin: 10}}
      bottomDivider
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.coinData}>
        <View style={styles.iconWrapper}>
          <Image source={renderImage(route.params.coin)} style={styles.image} />
        </View>
        <View style={styles.section}>
          <Text>
            {`${route.params.balance} ${coin} = ${
              route.params.balancePrice
            } ${currency}`}
          </Text>
        </View>
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
      <View style={styles.list}>
        {transactionList.length === 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>No data.</Text>
          </View>
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            keyExtractor={keyExtractor}
            data={transactionList}
            renderItem={renderItem}
            scrollEnabled={true}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  coinData: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    flex: 1,
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
  titleStyle: {
    color: colors.mainLight,
  },
  list: {
    flex: 1,
  },
  itemCol: {
    flex: 1,
    justifyContent: 'center',
  },
  coin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  image: {
    height: 100,
    width: 100,
  },
});

const mapStateToProps = state => ({
  myWallets: state.wallet.myWallets,
  current: state.wallet.current,
  phrase: state.wallet.phrase,
  currency: state.wallet.currency,
  uuidMobile: state.wallet.uuid,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransactionHistoryScreen);
