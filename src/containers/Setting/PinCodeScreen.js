import React, {useState} from 'react';
import {
  Alert,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {Button, Input} from 'react-native-elements';
import {StackActions} from '@react-navigation/native';
import {colors} from '../../styles';
import Locale from 'ewallet/src/locales';

const PinCodeScreen = ({navigation, phrase, current, pinCode, route}) => {
  const [code, setCode] = useState();
  const input = React.createRef();

  const checkPin = pin => {
    if (pin !== pinCode) {
      Alert.alert(
        Locale['TEXT__GENERAL_ERROR'],
        Locale['MSG__INCORRECT_PASSWORD'],
      );
    } else if (route && route.params && route.params.resetPinCode) {
      navigation.dispatch(StackActions.replace('ResetPinCode'));
    } else {
      navigation.dispatch(
        StackActions.replace('RecoveryPhrase', {
          phrase: phrase[route.params.currentIndex] || phrase[current],
        }),
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.input}>
        <Input
          ref={input}
          containerStyle={{width: '90%'}}
          inputStyle={{marginLeft: 10}}
          leftIcon={{type: 'ionicon', name: 'ios-lock'}}
          leftIconContainerStyle={{width: 40, marginLeft: 0}}
          onChangeText={text => setCode(text)}
          placeholder={Locale['TEXT__CHECK_PASSWORD']}
          autoFocus
        />
        <View style={{height: 100}} />
        <Button
          title={Locale['TEXT__CHECK']}
          buttonStyle={styles.buttonStyle}
          onPress={() => checkPin(code)}
        />
        {/** <SmoothPinCodeInput
          ref={pinInput}
          autoFocus={true}
          value={code}
          cellStyle={{borderColor: colors.mainLight, borderWidth: 2}}
          onTextChange={pin => setCode(pin)}
          onFulfill={checkPin}
          onBackspace={() => console.log('No more back.')}
          password
          mask={<View style={styles.mask} />}
        /> */}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    marginTop: 100,
    alignItems: 'center',
  },
  buttonStyle: {
    paddingVertical: 15,
    paddingHorizontal: 100,
    backgroundColor: colors.mainLight,
  },
});

const mapStateToProps = state => ({
  myWallets: state.wallet.myWallets,
  current: state.wallet.current,
  phrase: state.wallet.phrase,
  pinCode: state.wallet.pinCode,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PinCodeScreen);
