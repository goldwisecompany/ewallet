import React, {useState, useEffect} from 'react';
import {Image, Linking, FlatList, View, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import {createWallet} from '../../actions/index';
import CryptoNewsApi from 'crypto-news-api';
// import {WebView} from 'react-native-webview';
const Api = new CryptoNewsApi('389b9cbc389a81600771e47dd922ab52');

const NewsScreen = ({navigation}) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    Api.getTopNews()
      .then(articlesData => {
        setArticles(articlesData);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({item}) => (
    <ListItem
      title={item.title}
      containerStyle={styles.listItem}
      leftElement={
        <Image style={styles.image} source={{uri: item.originalImageUrl}} />
      }
      bottomDivider
      subtitle={item.sourceDomain}
      onPress={() => Linking.openURL(item.url)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={keyExtractor}
        data={articles}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
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
