import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  View,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button, Input} from 'react-native-elements';
import {validateMnemonic} from '../../services/wallet';
import {colors} from '../../styles';
import Locale from 'ewallet/src/locales';

const ImportWalletScreen = ({navigation}) => {
  const [recoveryPhrase, setRecoveryPhrase] = useState('');

  const onPressNext = () => {
    const isValid = validateMnemonic(recoveryPhrase);
    if (isValid) {
      navigation.navigate('CreateAccount', {recoveryPhrase});
    } else {
      Alert.alert(
        Locale['TEXT__GENERAL_WARNING'],
        Locale['MSG__WALLET_INVALID_IMPORT'],
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.inputWrapper}>
        <Input
          containerStyle={styles.input}
          placeholder={Locale['PLACEHOLDER__WALLET_RECOVERY_PHRASE']}
          onChangeText={text => setRecoveryPhrase(text)}
          inputContainerStyle={{borderBottomWidth: 0, flex: 1}}
          multiline
          returnKeyType="done"
          autoFocus
        />
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button
          title={Locale['TEXT__WALLET_IMPORT']}
          buttonStyle={styles.buttonStyle}
          onPress={onPressNext}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: colors.mainLightTrans,
    width: '90%',
    height: '60%',
    borderRadius: 10,
  },
  buttonStyle: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    backgroundColor: colors.mainLight,
  },
});

export default ImportWalletScreen;
