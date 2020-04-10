import React from 'react';
import {connect} from 'react-redux';
import {Alert, FlatList, View, ScrollView, StyleSheet} from 'react-native';
import {Button, CheckBox, ListItem, Text} from 'react-native-elements';
import {changeWallet, recreateWallet} from '../../actions/index';
import {colors} from '../../styles';

const WalletManagementScreen = ({
  navigation,
  myWallets,
  current,
  phrase,
  walletName,
  changeWalletConnect,
  recreateWalletConnect,
}) => {
  const keyExtractor = (item, index) => index.toString();

  const renderWallets = ({item, index}) => (
    <View
      style={
        index === current
          ? styles.walletContainerActive
          : styles.walletContainerInActive
      }>
      <View style={{marginLeft: 15, marginTop: 10, flexDirection: 'row'}}>
        <Text style={{fontSize: 20}}>{walletName[index]}</Text>
        <CheckBox
          center
          containerStyle={{
            flex: 1,
            backgroundColor: 'transparent',
            margin: 0,
            padding: 0,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={index === current}
          onPress={() => {
            console.log(item);
            changeWalletConnect({index});
            Alert.alert('', 'Wallet Changed!');
          }}
        />
      </View>
      <FlatList
        keyExtractor={keyExtractor}
        data={Object.keys(item)}
        renderItem={({item}) => (
          <ListItem title={item} subtitle={myWallets[index][item].address} />
        )}
        scrollEnabled={false}
      />
      <Button
        title="Show Phrases"
        containerStyle={{
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
        buttonStyle={{
          marginHorizontal: 15,
          borderRadius: 10,
          paddingHorizontal: 50,
          backgroundColor: colors.mainLight,
        }}
        type="solid"
        onPress={() => navigation.navigate('PinCode')}
      />
      <View style={{height: 0.5, backgroundColor: 'gray', margin: 15}} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.addWalletWrapper}>
        <Button
          title="Add Wallet"
          type="solid"
          containerStyle={styles.addWalletContainerStyle}
          buttonStyle={styles.addWalletButtonStyle}
          onPress={() => {
            recreateWalletConnect();
            navigation.navigate('Launch');
          }}
        />
      </View>
      <FlatList
        keyExtractor={keyExtractor}
        data={myWallets}
        renderItem={renderWallets}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    marginBottom: 20,
  },
  addWalletWrapper: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addWalletContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addWalletButtonStyle: {
    paddingHorizontal: 50,
    backgroundColor: colors.mainLight,
  },
  walletContainerActive: {
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    borderColor: colors.mainLightTrans,
  },
  walletContainerInActive: {
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    borderColor: colors.mainDark,
  },
});

const mapStateToProps = state => ({
  myWallets: state.wallet.myWallets,
  current: state.wallet.current,
  phrase: state.wallet.phrase,
  walletName: state.wallet.walletName,
});

const mapDispatchToProps = {
  changeWalletConnect: changeWallet,
  recreateWalletConnect: recreateWallet,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WalletManagementScreen);
