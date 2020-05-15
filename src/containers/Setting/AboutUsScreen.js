import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Text} from 'react-native-elements';

const AboutUsScreen = ({navigation, route, myWallets, current}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={{margin: 20}}>
        <Text>PRN Wallet is a Secure Cryptocurrency Wallet on mobile.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const mapStateToProps = state => ({
  myWallets: state.wallet.myWallets,
  current: state.wallet.current,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AboutUsScreen);
