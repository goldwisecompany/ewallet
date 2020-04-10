import React, {useState, useEffect} from 'react';
import {
  Alert,
  Clipboard,
  View,
  Share,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {Icon, Input, Text} from 'react-native-elements';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {StackActions} from '@react-navigation/native';
import {colors} from '../../styles';

const PinCodeScreen = ({navigation, phrase, current, pinCode}) => {
  const [code, setCode] = useState();
  const pinInput = React.createRef();

  useEffect(() => {
    pinInput.current.focus();
  }, []);

  const checkPin = pin => {
    if (pin !== pinCode) {
      pinInput.current.shake().then(() => setCode(''));
    } else {
      navigation.dispatch(
        StackActions.replace('RecoveryPhrase', {
          phrase: phrase[current],
        }),
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <SmoothPinCodeInput
          ref={pinInput}
          autoFocus={true}
          value={code}
          cellStyle={{borderColor: colors.mainLight, borderWidth: 2}}
          onTextChange={pin => setCode(pin)}
          onFulfill={checkPin}
          onBackspace={() => console.log('No more back.')}
          password
          mask={<View style={styles.mask} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  input: {
    marginTop: 100,
  },
  mask: {
    width: 10,
    height: 10,
    borderRadius: 25,
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
