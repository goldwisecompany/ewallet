import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Button, Input} from 'react-native-elements';
import {updateData} from '../../actions/index';
import {colors} from '../../styles';
import Locale from 'ewallet/src/locales';

const CreateAccountScreen = ({
  navigation,
  route,
  updateDataConnect,
  pinCode,
}) => {
  const [nickname, setNickname] = useState('');
  const [inputPinCode, setInputPinCode] = useState('');
  const [confirmPinCode, setConfirmPinCode] = useState('');
  const [isChecked, setIsChecked] = useState(true);

  const onPressLoading = () => {
    if (confirmPinCode !== inputPinCode) {
      setIsChecked(false);
      confirmInput.current.shake();
    } else {
      updateDataConnect({
        walletName: nickname,
        pinCode: inputPinCode || pinCode,
      });
      navigation.navigate('Loading', {
        recoveryPhrase: route.params && route.params.recoveryPhrase,
      });
    }
  };

  const isSetupPinCode = pinCode !== '';
  const input = React.createRef();
  const confirmInput = React.createRef();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={{width: 350, margin: 50}}>
        <Input
          ref={input}
          containerStyle={{margin: 10}}
          inputStyle={{marginLeft: 10}}
          placeholder={Locale['TEXT__WALLET_NICKNAME']}
          leftIcon={{type: 'ionicon', name: 'ios-person'}}
          leftIconContainerStyle={{width: 40, marginLeft: 0}}
          onChangeText={text => setNickname(text)}
        />
        {!isSetupPinCode && (
          <>
            <Input
              containerStyle={{margin: 10}}
              inputStyle={{marginLeft: 10}}
              placeholder={`${Locale['TEXT_PASSWORD']} (${
                Locale['HINT__CREATE_PASSWORD']
              })`}
              leftIcon={{type: 'ionicon', name: 'ios-lock'}}
              leftIconContainerStyle={styles.leftIconContainerStyle}
              onChangeText={pin => setInputPinCode(pin)}
              maxLength={14}
            />
            <Input
              ref={confirmInput}
              containerStyle={{margin: 10}}
              inputStyle={{marginLeft: 10}}
              placeholder={Locale['TEXT__CHECK_PASSWORD']}
              leftIcon={{type: 'ionicon', name: 'ios-lock'}}
              leftIconContainerStyle={styles.leftIconContainerStyle}
              onChangeText={pin => setConfirmPinCode(pin)}
              maxLength={14}
              errorMessage={isChecked ? '' : 'Password Inconsistent'}
            />
          </>
        )}
      </View>
      <Button
        title={Locale['TEXT__WALLET_CREATE']}
        buttonStyle={styles.buttonStyle}
        onPress={onPressLoading}
        disabled={
          !(
            nickname !== '' &&
            (isSetupPinCode ||
              (inputPinCode.length >= 6 && inputPinCode.length <= 14))
          )
        }
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    backgroundColor: colors.mainLight,
  },
  leftIconContainerStyle: {
    width: 40,
    marginLeft: 0,
  },
});

const mapStateToProps = state => ({
  myWallets: state.wallet.myWallets,
  current: state.wallet.current,
  pinCode: state.wallet.pinCode,
});

const mapDispatchToProps = {
  updateDataConnect: updateData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateAccountScreen);
