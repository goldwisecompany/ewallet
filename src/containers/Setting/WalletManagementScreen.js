import React from 'react';
import {connect} from 'react-redux';
import {Alert, FlatList, View, ScrollView, StyleSheet} from 'react-native';
import {Button, CheckBox, ListItem, Text} from 'react-native-elements';
import {changeWallet, recreateWallet} from '../../actions/index';
import {colors} from '../../styles';
import Locale from 'ewallet/src/locales';
import {COIN_SYMBOL} from '../../constants';

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
          containerStyle={styles.checkBox}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={index === current}
          onPress={() => {
            changeWalletConnect({index});
            Alert.alert('', `${Locale['TEXT__WALLET_CHANGED']}!`);
          }}
        />
      </View>
      <FlatList
        keyExtractor={keyExtractor}
        data={Object.keys(item)}
        renderItem={({item}) => (
          <ListItem
            title={COIN_SYMBOL[item]}
            subtitle={myWallets[index][item].address}
          />
        )}
        scrollEnabled={false}
      />
      <Button
        title={Locale['TEXT__SHOW_PARASES']}
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
        onPress={() => {
          navigation.navigate('PinCode', {currentIndex: index});
        }}
      />
      <View style={{height: 20}} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.addWalletWrapper}>
        <Button
          title={Locale['TEXT__ADD_WALLET']}
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
  checkBox: {
    flex: 1,
    backgroundColor: 'transparent',
    margin: 0,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
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
