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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {createWallet} from '../../actions/index';
import CryptoNewsApi from 'crypto-news-api';
// import {WebView} from 'react-native-webview';
import {TabBar, TabView} from 'react-native-tab-view';
import Locale from 'ewallet/src/locales';
const Api = new CryptoNewsApi('389b9cbc389a81600771e47dd922ab52');

const initialLayout = {width: Dimensions.get('window').width};

const NewsScreen = ({navigation}) => {
  const [articles, setArticles] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [investmentProjects, setInvestmentProjects] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingBlog, setRefreshingBlog] = useState(false);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: Locale['TEXT__NEWS']},
    {key: 'second', title: Locale['TEXT__BLOGS']},
    {key: 'third', title: Locale['TEXT__INVESTMENT']},
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

  const ThirdRoute = () => (
    <FlatList
      keyExtractor={keyExtractor}
      data={investmentProjects}
      renderItem={renderItem}
    />
  );

  useEffect(() => {
    const fetchBlogArticles = async () => {
      try {
        const res = await fetch('https://pranceworld.site/api/blogs');
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.log(error);
      }
      setRefreshingBlog(false);
      setInvestmentProjects([
        {
          title: 'DeBank',
          url: 'https://debank.com/',
          image:
            'https://theme.zdassets.com/theme_assets/9347551/ab92fd402a6d803c4e7752b6ca6e48f6749ae322.png',
          subtitle: Locale['DESC__INVESTMENT_PROJECTS_DEBANK'],
        },
        {
          title: 'Celsius Network',
          url: 'https://celsius.network/',
          image:
            'https://23m75o3e07wtfdo7h17w4u61-wpengine.netdna-ssl.com/wp-content/themes/wpog_celsius/assets/img/logo-celsius@2x.png',
          subtitle: Locale['DESC__INVESTMENT_PROJECTS_CELSIUS_NETWORK'],
        },
      ]);
    };
    fetchBlogArticles();
  }, [refreshingBlog]);

  useEffect(() => {
    Api.getTopNews()
      .then(articlesData => {
        setArticles(articlesData);
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
          resizeMode="contain"
          style={styles.image}
          source={{uri: item.originalImageUrl || item.image}}
        />
      }
      bottomDivider
      subtitle={item.sourceDomain || item.subtitle}
      onPress={() => Linking.openURL(item.url || item.detail)}
    />
  );

  const renderIcon = ({route, color}) => {
    const icons = {
      [Locale['TEXT__NEWS']]: 'newspaper',
      [Locale['TEXT__BLOGS']]: 'rss',
      [Locale['TEXT__INVESTMENT']]: 'currency-usd',
    };
    return (
      <Icon name={icons[route.title]} size={20} iconStyle={{marginTop: 0}} />
    );
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      style={{backgroundColor: 'white'}}
      indicatorStyle={{backgroundColor: 'black'}}
      renderIcon={renderIcon}
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
            case 'third':
              return ThirdRoute();
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
