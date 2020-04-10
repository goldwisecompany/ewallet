import React from 'react';
import {connect} from 'react-redux';
import {FlatList, View, StyleSheet} from 'react-native';
import {ListItem, Text} from 'react-native-elements';
import {CURRENCY} from '../../constants';
import {changeCurrency} from '../../actions/index';

const currencyList = Object.keys(CURRENCY).map(key => ({
  symbol: key,
  name: CURRENCY[key],
}));

const CurrencyScreen = ({navigation, currency, changeCurrencyConnect}) => {
  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({item}) => (
    <ListItem
      title={item.symbol}
      containerStyle={styles.listItem}
      leftElement={
        <View style={styles.leftElement}>
          <Text>{item.name}</Text>
        </View>
      }
      bottomDivider
      onPress={() => changeCurrencyConnect(item.symbol)}
      rightIcon={item.symbol === currency && {name: 'check'}}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlatList
          keyExtractor={keyExtractor}
          data={currencyList}
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
  listItem: {
    height: 50,
  },
  leftElement: {
    width: 150,
  },
});

const mapStateToProps = state => ({
  currency: state.wallet.currency,
});

const mapDispatchToProps = {
  changeCurrencyConnect: changeCurrency,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrencyScreen);
