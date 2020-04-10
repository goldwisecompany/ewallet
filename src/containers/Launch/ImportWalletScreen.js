import React, {useState} from 'react';
import {Alert, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button, Input} from 'react-native-elements';
import {validateMnemonic} from '../../services/wallet';
import {colors} from '../../styles';

const ImportWalletScreen = ({navigation}) => {
  const [recoveryPhrase, setRecoveryPhrase] = useState('');

  const onPressNext = () => {
    const isValid = validateMnemonic(recoveryPhrase);
    if (isValid) {
      navigation.navigate('CreateAccount', {recoveryPhrase});
    } else {
      Alert.alert('Waring', 'Invalid 12-word Recovery Phrase.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Input
          containerStyle={styles.input}
          placeholder="Paste your 12-word recovery phrase here to restore your wallet."
          onChangeText={text => setRecoveryPhrase(text)}
          inputContainerStyle={{borderBottomWidth: 0, flex: 1}}
          multiline
          returnKeyType="go"
          autoFocus
        />
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button
          title="Import Wallet"
          buttonStyle={styles.buttonStyle}
          onPress={onPressNext}
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
