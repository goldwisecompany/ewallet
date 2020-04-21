import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {ListItem} from 'react-native-elements';

const SettingScreen = ({navigation, currency}) => {
  const configList = [
    {
      name: 'Wallet Management',
      icon: 'account-balance-wallet',
      chevron: true,
      onPress: () => navigation.navigate('WalletManagement'),
    },
    {
      name: 'Currency',
      icon: 'attach-money',
      rightTitle: currency,
      chevron: true,
      onPress: () => navigation.navigate('Currency'),
    },
    // TODO:
    // {
    //   name: 'FAQ',
    //   icon: 'error',
    //   chevron: true,
    // },
    // {
    //   name: 'About us',
    //   icon: 'people',
    //   chevron: true,
    // },
    {
      name: 'Terms of Service',
      icon: 'description',
      chevron: true,
      onPress: () => navigation.navigate('TermsofService'),
    },
    {
      name: 'Privacy Policy',
      icon: 'security',
      chevron: true,
      onPress: () => navigation.navigate('PrivacyPolicy'),
    },
    {
      name: 'Version',
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
