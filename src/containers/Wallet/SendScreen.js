import React, {useState} from 'react';
import {Alert, ScrollView, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Icon, Button, Input, Text} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import {
  transferEth,
  transferTrx,
  transferBtc,
  transferPrn,
  transferBch,
} from '../../services/wallet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../styles';

const SendScreen = ({navigation, route, myWallets, current, pinCode}) => {
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

  const onCheckTransaction = () => {
    if (receiver === '' || amount === '') {
      Alert.alert(
        'Error',
        'Something went wrong. Please check your input data.',
      );
    } else if (pin !== pinCode) {
      Alert.alert('Error', 'PinCode Error.');
    } else if (
      coin === 'ETH' ||
      coin === 'TRX' ||
      coin === 'BTC' ||
      coin === 'PRN' ||
      coin === 'BCH'
    ) {
      Alert.alert(
        'Transfer',
        'Are you sure you want to submit the transaction?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => pendingMessage()},
        ],
      );
    }
  };

  const pendingMessage = () => {
    setDisabled(true);
    Alert.alert(
      'Transaction Pending',
      'The transaction has been broadcast. Please wait for a while.',
      [{text: 'OK', onPress: () => transfer()}],
    );
  };

  const transfer = async () => {
    setPending(true);
    const timer = setTimeout(() => {
      setDisabled(false);
      clearTimeout(timer);
    }, 5000);
    try {
      if (coin === 'ETH') {
        await transferEth(
          receiver,
          amount,
          myWallets[current][coin].address,
          myWallets[current][coin].privateKey,
        );
      } else if (coin === 'TRX') {
        await transferTrx(
          receiver,
          amount,
          myWallets[current][coin].address,
          myWallets[current][coin].privateKey,
        );
      } else if (coin === 'BTC') {
        await transferBtc(
          receiver,
          amount,
          myWallets[current][coin].address,
          myWallets[current][coin].privateKey,
        );
      } else if (coin === 'BCH') {
        await transferBch(
          receiver,
          amount,
          myWallets[current][coin].address,
          myWallets[current][coin].phrase, // !! Alert
        );
      } else if (coin === 'PRN') {
        await transferPrn(
          receiver,
          amount,
          myWallets[current][coin].address,
          myWallets[current][coin].privateKey,
        );
      } else if (coin === 'USDT') {
        await transferPrn(
          receiver,
          amount,
          myWallets[current][coin].address,
          myWallets[current][coin].privateKey,
        );
      }
      Alert.alert('Transaction Success', 'The transaction has been Confirmed.');
    } catch (error) {
      Alert.alert('Transaction error', error.message);
    }
    setPending(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.pendingContainer}>
        {pending && (
          <View style={styles.pendingMessage}>
            <Icon name="info-outline" size={20} color="gray" />
            <Text style={{color: 'gray', paddingLeft: 5}}>
              A transaction is Pending.
            </Text>
          </View>
        )}
      </View>
      <View style={styles.mainContainer}>
        <Input
          value={receiver}
          containerStyle={{margin: 20, width: '85%'}}
          inputStyle={{marginLeft: 10}}
          placeholder="Receiver"
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
                {label: 'PRN', value: 'PRN'},
                {label: 'BTC', value: 'BTC'},
                {label: 'BCH', value: 'BCH'},
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
              placeholder="Amount"
              onChangeText={text => setAmount(text)}
            />
          </View>
        </View>
        <Input
          containerStyle={{margin: 20, width: '85%'}}
          inputStyle={{marginLeft: 10}}
          placeholder="Note"
          // leftIcon={{type: 'ionicon', name: 'md-list-box'}}
          leftIconContainerStyle={{width: 40, marginLeft: 0}}
          onChangeText={text => setNote(text)}
        />
        <Input
          containerStyle={{margin: 20, width: '85%'}}
          inputStyle={{marginLeft: 10}}
          placeholder="Password"
          // leftIcon={{type: 'ionicon', name: 'md-lock'}}
          leftIconContainerStyle={{width: 40, marginLeft: 0}}
          onChangeText={code => setPin(code)}
          maxLength={14}
        />
        <Button
          title="Send"
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
    paddingHorizontal: 10,
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    width: 40,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => ({
  myWallets: state.wallet.myWallets,
  current: state.wallet.current,
  pinCode: state.wallet.pinCode,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SendScreen);
