import React, {useState} from 'react';
import {FlatList, View, StyleSheet, Switch} from 'react-native';
import {connect} from 'react-redux';
import {ListItem} from 'react-native-elements';
import Locale from 'ewallet/src/locales';

const SettingScreen = ({navigation, currency}) => {
  const configList = [
    {
      name: Locale['TEXT__WALLET_MANAGEMENT'],
      icon: 'account-balance-wallet',
      chevron: true,
      onPress: () => navigation.navigate('WalletManagement'),
    },
    {
      name: Locale['TEXT__RESET_PASSWORD'],
      icon: 'https',
      chevron: true,
      onPress: () => navigation.navigate('PinCode', {resetPinCode: true}),
    },
    {
      name: Locale['TEXT__CURRENCY'],
      icon: 'attach-money',
      rightTitle: currency,
      chevron: true,
      onPress: () => navigation.navigate('Currency'),
    },
    {
      name: Locale['TEXT__FAQ'],
      icon: 'error',
      chevron: true,
      onPress: () => navigation.navigate('Faq'),
    },
    {
      name: Locale['TEXT__ABOUT_US'],
      icon: 'people',
      chevron: true,
      onPress: () => navigation.navigate('AboutUs'),
    },
    {
      name: Locale['TEXT__TERMS_OF_SERVICE'],
      icon: 'description',
      chevron: true,
      onPress: () => navigation.navigate('TermsofService'),
    },
    {
      name: Locale['TEXT__PRIVACY_POLICY'],
      icon: 'security',
      chevron: true,
      onPress: () => navigation.navigate('PrivacyPolicy'),
    },
    {
      name: Locale['TEXT__APP_VERSION'],
      icon: 'class',
      rightTitle: '1.0.0',
      chevron: false,
    },
  ];

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({item}) => (
    <ListItem
      title={item.name}
      leftIcon={{name: item.icon}}
      bottomDivider
      chevron={item.chevron}
      rightTitle={item.rightTitle || ''}
      onPress={item.onPress}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlatList
          keyExtractor={keyExtractor}
          data={configList}
          renderItem={renderItem}
          scrollEnabled={false}
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
  list: {
    marginTop: 20,
  },
});

const mapStateToProps = state => ({
  currency: state.wallet.currency,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingScreen);
