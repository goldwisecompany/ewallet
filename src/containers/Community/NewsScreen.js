import React from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {createWallet} from '../../actions/index';
import {WebView} from 'react-native-webview';

const NewsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <WebView
        containerStyle={{flex: 1}}
        source={{uri: 'https://cointelegraph.com/'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
)(NewsScreen);
