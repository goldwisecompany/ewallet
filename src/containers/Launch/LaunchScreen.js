import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Button, Text} from 'react-native-elements';
import {colors} from '../../styles';
import Locale from 'ewallet/src/locales';

const PRN = require('../../assets/imgPRN.png');

const LaunchScreen = ({navigation, isGenerating}) => {
  const onPressCreateAccount = () => {
    navigation.navigate('CreateAccount');
  };

  const onPressImportWallet = () => {
    navigation.navigate('ImportWallet');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <View style={styles.logo}>
          <Image style={styles.logo} source={PRN} />
        </View>
      </View>
      <View style={styles.buttonGroup}>
        <Button
          title={Locale['TEXT__WALLET_IMPORT']}
          buttonStyle={styles.buttonStyle}
          onPress={onPressImportWallet}
        />
        <Button
          title={Locale['TEXT__WALLET_CREATE']}
          buttonStyle={styles.buttonStyle}
          onPress={onPressCreateAccount}
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
    justifyContent: 'center',
  },
  logoWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGroup: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonStyle: {
    margin: 10,
    paddingVertical: 15,
    paddingHorizontal: 50,
    backgroundColor: colors.mainLight,
  },
});

const mapStateToProps = state => ({
  isGenerating: state.wallet.isGenerating,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LaunchScreen);
