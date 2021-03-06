import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  View,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {Button, Input} from 'react-native-elements';
import {updateData} from '../../actions/index';
import {colors} from '../../styles';
import Locale from 'ewallet/src/locales';

const ResetPinCodeScreen = ({
  navigation,
  route,
  updateDataConnect,
  pinCode,
}) => {
  const [inputPinCode, setInputPinCode] = useState('');
  const [confirmPinCode, setConfirmPinCode] = useState('');
  const [isChecked, setIsChecked] = useState(true);

  const onPressLoading = () => {
    if (confirmPinCode !== inputPinCode) {
      setIsChecked(false);
      confirmInput.current.shake();
    } else {
      updateDataConnect({
        pinCode: inputPinCode || pinCode,
      });
      Alert.alert(
        Locale['TEXT__GENERAL_SUCCESS'],
        Locale['MSG__PASSWORD_RESET_SUCCESS'],
      );
      navigation.popToTop();
    }
  };

  const input = React.createRef();
  const confirmInput = React.createRef();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={{width: 350, margin: 50}}>
        <Input
          containerStyle={{margin: 10}}
          inputStyle={{marginLeft: 10}}
          placeholder={`${Locale['TEXT__PASSWORD']} (${
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
          placeholder={Locale['PLACEHOLDER__CONFIRM_PASSWORD']}
          leftIcon={{type: 'ionicon', name: 'ios-lock'}}
          leftIconContainerStyle={styles.leftIconContainerStyle}
          onChangeText={pin => setConfirmPinCode(pin)}
          maxLength={14}
          errorMessage={isChecked ? '' : Locale['MSG__PASSWORD_INCONSISTENT']}
        />
      </View>
      <Button
        title={Locale['TEXT__RESET']}
        buttonStyle={styles.buttonStyle}
        onPress={onPressLoading}
        disabled={!(inputPinCode.length >= 6 && inputPinCode.length <= 14)}
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
)(ResetPinCodeScreen);
