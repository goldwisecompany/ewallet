import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button, Input} from 'react-native-elements';
import {updateData} from '../../actions/index';
import {colors} from '../../styles';

const CreateAccountScreen = ({
  navigation,
  route,
  updateDataConnect,
  pinCode,
}) => {
  const [nickname, setNickname] = useState('');
  const [inputPinCode, setInputPinCode] = useState('');

  const onPressLoading = () => {
    updateDataConnect({
      walletName: nickname,
      pinCode: inputPinCode || pinCode,
    });
    navigation.navigate('Loading', {
      recoveryPhrase: route.params && route.params.recoveryPhrase,
    });
  };

  const isSetupPinCode = pinCode !== '';
  const input = React.createRef();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={{width: 300, margin: 50}}>
        <Input
          ref={input}
          containerStyle={{margin: 10}}
          inputStyle={{marginLeft: 10}}
          placeholder="Wallet nickname"
          leftIcon={{type: 'ionicon', name: 'ios-person'}}
          leftIconContainerStyle={{width: 40, marginLeft: 0}}
          onChangeText={text => setNickname(text)}
        />
        {!isSetupPinCode && (
          <Input
            containerStyle={{margin: 10}}
            inputStyle={{marginLeft: 10}}
            placeholder="Pincode (6 ~ 14 characters)"
            leftIcon={{type: 'ionicon', name: 'ios-lock'}}
            leftIconContainerStyle={{width: 40, marginLeft: 0}}
            onChangeText={pin => setInputPinCode(pin)}
            maxLength={14}
          />
        )}
      </View>
      <Button
        title="Create Wallet"
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
