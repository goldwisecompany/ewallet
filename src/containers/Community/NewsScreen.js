import React, {useState, useEffect} from 'react';
import {
  Image,
  Linking,
  FlatList,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import {createWallet} from '../../actions/index';
import CryptoNewsApi from 'crypto-news-api';
// import {WebView} from 'react-native-webview';
import {TabBar, TabView, SceneMap} from 'react-native-tab-view';
const Api = new CryptoNewsApi('389b9cbc389a81600771e47dd922ab52');

const initialLayout = {width: Dimensions.get('window').width};

const NewsScreen = ({navigation}) => {
  const [articles, setArticles] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingBlog, setRefreshingBlog] = useState(false);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'News'},
    {key: 'second', title: 'Blogs'},
  ]);

  const FirstRoute = () => (
    <FlatList
      keyExtractor={keyExtractor}
      data={articles}
      renderItem={renderItem}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );

  const SecondRoute = () => (
    <FlatList
      keyExtractor={keyExtractor}
      data={blogs}
      renderItem={renderItem}
      onRefresh={onRefreshBlog}
      refreshing={refreshingBlog}
    />
  );

  useEffect(() => {
    const fetchBlogArticles = async () => {
      try {
        const res = await fetch('http://pranceworld.site/api/blogs');
        const data = await res.json();
        console.log(data);
        setBlogs(data);
      } catch (error) {
        console.log(error);
      }
      setRefreshingBlog(false);
    };
    fetchBlogArticles();
  }, [refreshingBlog]);

  useEffect(() => {
    Api.getTopNews()
      .then(articlesData => {
        setArticles(articlesData);
        console.log(articlesData);
        setRefreshing(false);
      })
      .catch(error => {
        setRefreshing(false);
      });
  }, [refreshing]);

  const onRefresh = () => {
    setRefreshing(true);
  };

  const onRefreshBlog = () => {
    setRefreshingBlog(true);
  };

  const keyExtractor = (item, indexNum) => indexNum.toString();

  const renderItem = ({item}) => (
    <ListItem
      key={item.id || item.title}
      title={item.title}
      containerStyle={styles.listItem}
      leftElement={
        <Image
          style={styles.image}
          source={{uri: item.originalImageUrl || item.image}}
        />
      }
      bottomDivider
      subtitle={item.sourceDomain}
      onPress={() => Linking.openURL(item.url || item.detail)}
    />
  );

  const renderTabBar = props => (
    <TabBar
      {...props}
      style={{backgroundColor: 'white'}}
      indicatorStyle={{backgroundColor: 'black'}}
      labelStyle={{color: 'black'}}
    />
  );

  return (
    <View style={styles.container}>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={({route}) => {
          switch (route.key) {
            case 'first':
              return FirstRoute();
            case 'second':
              return SecondRoute();
            default:
              return null;
          }
        }}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scene: {
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
