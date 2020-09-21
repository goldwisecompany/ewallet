import React, {useState} from 'react';
import {Alert, ScrollView, View, StyleSheet, Switch} from 'react-native';
import {connect} from 'react-redux';
import {Icon, Button, Input, Text} from 'react-native-elements';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import RNPickerSelect from 'react-native-picker-select';
import {
  transferEth,
  transferTrx,
  transferBtc,
  transferPrn,
  transferBch,
  transferUsdt,
} from '../../services/wallet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TouchID from 'react-native-touch-id';
import ReactNativeBiometrics from 'react-native-biometrics';
import {colors} from '../../styles';
import Locale from 'ewallet/src/locales';

export const checkTouchSupport = async () => {
  try {
    return await TouchID.isSupported({unifiedErrors: true});
  } catch (err) {
    return undefined;
  }
};

const SendScreen = ({
  navigation,
  route,
  myWallets,
  current,
  pinCode,
  uuidMobile,
}) => {
  const [receiver, setReceiver] = useState(
    (route.params && route.params.receiver) || '',
  );
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [coin, setCoin] = useState(
    (route.params && route.params.coin) || 'PRN',
  );
  const [pin, setPin] = useState('');
  const [pending, setPending] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [switchEnabled, setSwitchEnabled] = useState(false);
  const toggleSwitch = () => setSwitchEnabled(previousState => !previousState);

  const onCheckTransaction = async () => {
    if (receiver === '' || amount === '') {
      Alert.alert(Locale['TEXT__GENERAL_ERROR'], Locale['MSG__INVALID_INPUT']);
    } else if (switchEnabled) {
      try {
        // const deviceTouchType = await checkTouchSupport();
        ReactNativeBiometrics.isSensorAvailable().then(resultObject => {
          const {available, biometryType} = resultObject;
          if (available && biometryType === ReactNativeBiometrics.TouchID) {
            ReactNativeBiometrics.simplePrompt({
              promptMessage: Locale['HINT__FINGERPRINT'],
            })
              .then(resultObject => {
                const {success} = resultObject;
                if (success) {
                  pendingMessage();
                }
              })
              .catch(() => {
                Alert.alert(
                  Locale['TEXT__GENERAL_ERROR'],
                  Locale['MSG__AUTH_ERROR'],
                );
              });
          } else if (
            available &&
            biometryType === ReactNativeBiometrics.FaceID
          ) {
            ReactNativeBiometrics.simplePrompt({
              promptMessage: Locale['HINT__FACEID'],
            })
              .then(resultObject => {
                const {success} = resultObject;
                if (success) {
                  pendingMessage();
                }
              })
              .catch(() => {
                Alert.alert(
                  Locale['TEXT__GENERAL_ERROR'],
                  Locale['MSG__AUTH_ERROR'],
                );
              });
          } else if (
            available &&
            biometryType === ReactNativeBiometrics.Biometrics
          ) {
            ReactNativeBiometrics.simplePrompt({
              promptMessage: Locale['HINT__BIOMETRICS'],
            })
              .then(resultObject => {
                const {success} = resultObject;
                if (success) {
                  pendingMessage();
                }
              })
              .catch(() => {
                Alert.alert(
                  Locale['TEXT__GENERAL_ERROR'],
                  Locale['MSG__AUTH_ERROR'],
                );
              });
          } else {
            Alert.alert(
              Locale['TEXT__GENERAL_ERROR'],
              Locale['MSG__AUTH_ERROR'],
            );
          }
        });
      } catch (error) {
        Alert.alert(Locale['TEXT__GENERAL_ERROR'], Locale['MSG__AUTH_ERROR']);
      }
    } else if (
      coin === 'ETH' ||
      coin === 'TRX' ||
      coin === 'BTC' ||
      coin === 'PRN' ||
      coin === 'BCH' ||
      coin === 'USDT'
    ) {
      Alert.alert(Locale['TEXT__TRANSFER'], Locale['MSG__CONFIRM_TRANSFER'], [
        {
          text: Locale['TEXT__CANCEL'],
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => pendingMessage()},
      ]);
    }
  };

  const pendingMessage = () => {
    setDisabled(true);
    if (pin !== pinCode && !switchEnabled) {
      Alert.alert(
        Locale['TEXT__GENERAL_ERROR'],
        Locale['MSG__INCORRECT_PASSWORD'],
        [{text: 'OK', onPress: () => setDisabled(false)}],
      );
    } else {
      Alert.alert(Locale['TEXT__TRANSFER_SENT'], Locale['MSG__TRANSFER_SENT'], [
        {text: 'OK', onPress: () => transfer()},
      ]);
    }
  };

  const transfer = async () => {
    setPending(true);
    let txid = '';
    try {
      if (coin === 'ETH') {
        const receipt = await transferEth(
          receiver,
          amount,
          myWallets[current][coin].address,
          myWallets[current][coin].privateKey,
        );
        txid = receipt.transactionHash;
      } else if (coin === 'TRX') {
        txid = await transferTrx(
          receiver,
          amount,
          myWallets[current][coin].address,
          myWallets[current][coin].privateKey,
        );
      } else if (coin === 'BTC') {
        // TODO: txid
        txid = await transferBtc(
          receiver,
          amount,
          myWallets[current][coin].address,
          myWallets[current][coin].privateKey,
        );
      } else if (coin === 'BCH') {
        // TODO: txid
        await transferBch(
          receiver,
          amount,
          myWallets[current][coin].address,
          myWallets[current][coin].phrase, // !! Alert
        );
      } else if (coin === 'PRN') {
        const receipt = await transferPrn(
          receiver,
          amount,
          myWallets[current][coin].address,
          myWallets[current][coin].privateKey,
        );
        txid = receipt.transactionHash;
      } else if (coin === 'USDT') {
        const receipt = await transferUsdt(
          receiver,
          amount,
          myWallets[current][coin].address,
          myWallets[current][coin].privateKey,
        );
        txid = receipt.transactionHash;
      }
      const timer = setTimeout(() => {
        setDisabled(false);
        navigation.popToTop();
        clearTimeout(timer);
      }, 3000);
      Alert.alert(
        Locale['TEXT__TRANSFER_SUCCESS'],
        Locale['MSG__TRANSFER_SUCCESS'],
      );
    } catch (error) {
      Alert.alert(
        Locale['TEXT__TRANSFER_ERROR'],
        Locale['MSG__TRANSFER_ERROR'],
      );
      setDisabled(false);
    }

    setPending(false);
    firestore()
      .collection('user')
      .doc('txdata')
      .update({
        [`tx.${coin || Locale['TEXT__GENERAL_ERROR']}.${txid ||
          Locale['TEXT__GENERAL_ERROR']}`]: note,
      })
      .then(() => {})
      .catch(console.log);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.pendingContainer}>
        {pending && (
          <View style={styles.pendingMessage}>
            <Icon name="info-outline" size={20} color="gray" />
            <Text style={{color: 'gray', paddingLeft: 5}}>
              {Locale['MSG__TRANSACTION_PENDING']}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.mainContainer}>
        <Input
          value={receiver}
          containerStyle={{margin: 20, width: '85%'}}
          inputStyle={{marginLeft: 10}}
          placeholder={Locale['TEXT__RECEIVER']}
          leftIcon={{type: 'ionicon', name: 'ios-person'}}
          leftIconContainerStyle={{width: 40, marginLeft: 0}}
          rightIcon={{
            type: 'ionicon',
            name: 'ios-qr-scanner',
            onPress: () => navigation.navigate('Scanner'),
          }}
          onChangeText={setReceiver}
        />
        <View style={{flexDirection: 'row', width: '85%'}}>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: colors.mainDark,
              borderRadius: 5,
              marginLeft: 10,
            }}>
            <RNPickerSelect
              onValueChange={value => setCoin(value)}
              style={pickerSelectStyles}
              placeholder={{}}
              value={coin}
              items={[
                {label: 'PRNC', value: 'PRN'},
                {label: 'BTC', value: 'BTC'},
                {label: 'ETH', value: 'ETH'},
                {label: 'TRX', value: 'TRX'},
                {label: 'USDT', value: 'USDT'},
              ]}
              useNativeAndroidPickerStyle={false}
              Icon={() => {
                return <Ionicons name="md-arrow-down" size={20} color="gray" />;
              }}
            />
          </View>
          <View style={{flex: 2}}>
            <Input
              // containerStyle={{margin: 10}}
              inputStyle={{marginLeft: 10}}
              placeholder={Locale['TEXT__AMT']}
              onChangeText={text => setAmount(text)}
            />
          </View>
        </View>
        <Input
          containerStyle={{margin: 20, width: '85%'}}
          inputStyle={{marginLeft: 10}}
          placeholder={Locale['TEXT__NOTE']}
          // leftIcon={{type: 'ionicon', name: 'md-list-box'}}
          leftIconContainerStyle={{width: 40, marginLeft: 0}}
          onChangeText={text => setNote(text)}
        />
        <Input
          containerStyle={{margin: 20, width: '85%'}}
          inputStyle={{marginLeft: 10}}
          placeholder={Locale['TEXT__PASSWORD']}
          // leftIcon={{type: 'ionicon', name: 'md-lock'}}
          leftIconContainerStyle={{width: 40, marginLeft: 0}}
          onChangeText={code => setPin(code)}
          maxLength={14}
        />
        <View
          style={{
            height: 50,
            width: '80%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Icon name="fingerprint" size={25} color="gray" />
            <Text>{Locale['TEXT__BIOMETRIC_AUTH']}</Text>
          </View>
          <Switch value={switchEnabled} onValueChange={toggleSwitch} />
        </View>
        <Button
          title={Locale['TEXT__SEND']}
          buttonStyle={{
            paddingHorizontal: 100,
            backgroundColor: colors.mainLight,
          }}
          onPress={onCheckTransaction}
          disabled={disabled}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    height: 700,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  pendingContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pendingMessage: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    width: 50,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => ({
  myWallets: state.wallet.myWallets,
  current: state.wallet.current,
  pinCode: state.wallet.pinCode,
  uuidMobile: state.wallet.uuid,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SendScreen);
