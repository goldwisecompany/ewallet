import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Text} from 'react-native-elements';
import {MaterialIndicator} from 'react-native-indicators';
import {
  generateMnemonic,
  generateCoinWallet,
  web3,
} from '../../services/wallet.js';
import {createWallet} from '../../actions/index';
import {delay} from '../../utils/index';
import {colors} from '../../styles';
import Locale from 'ewallet/src/locales';

const LoadingScreen = ({navigation, wallet, createWalletConnect, route}) => {
  const [text, setText] = useState(Locale['MSG__WALLET_GENERATING']);

  useEffect(() => {
    const generateDefaultWallet = async () => {
      const phrase =
        (route.params && route.params.recoveryPhrase) || generateMnemonic();
      await delay(1000);
      const BTC = await generateCoinWallet(phrase, '0');
      const ETH = await generateCoinWallet(phrase, '60');
      const PRN = await generateCoinWallet(phrase, '60');
      const USDT = await generateCoinWallet(phrase, '60');
      const BCH = await generateCoinWallet(phrase, '145');
      const TRX = await generateCoinWallet(phrase, '195');
      setText(Locale['TEXT__WALLET_CREATE']);
      createWalletConnect({
        myWallets: {BTC, BCH, ETH, PRN, TRX, USDT},
        phrase,
      });
      await delay(1000);
      setText(Locale['MSG__WALLET_GENERATED']);
      await delay(1000);
      navigation.reset({
        index: 0,
        routes: [{name: 'Main'}],
      });
    };
    generateDefaultWallet();
  }, []);

  return (
    <View style={styles.container}>
      <MaterialIndicator
        color={colors.mainLight}
        animationDuration={10000}
        size={300}
        trackWidth={10}
      />
      <View style={{position: 'absolute'}}>
        <Text h4>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => ({
  wallet: state.wallet,
});

const mapDispatchToProps = {
  createWalletConnect: createWallet,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoadingScreen);
