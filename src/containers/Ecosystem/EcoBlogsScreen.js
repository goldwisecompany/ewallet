import React, {useState, useEffect} from 'react';
import {Image, Linking, FlatList, View, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import {createWallet} from '../../actions/index';

const EcoBlogsScreen = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await fetch('https://pranceworld.site/api/ecoBlogs');
        const result = await res.json();
        const displayList = result.filter(
          blog => blog.type === route.params.type,
        );
        setData(displayList);
        setRefreshing(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPI();
  }, [refreshing, route]);

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
      subtitleStyle={{ height: 20 }}
      subtitle={item.sourceDomain || item.subtitle || item.body}
      onPress={() => navigation.navigate('EcoDetail', {blog: item})}
    />
  );

  const onRefresh = () => {
    setRefreshing(true);
  };

  const keyExtractor = (item, indexNum) => item.id.toString();

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={keyExtractor}
        data={data}
        renderItem={renderItem}
        onRefresh={onRefresh}
        refreshing={refreshing}
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
  textWrapper: {
    elevation: 1,
    zIndex: 1,
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.6)',
    marginTop: -50,
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    marginLeft: 10,
    elevation: 2,
    zIndex: 2,
    color: 'white',
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
)(EcoBlogsScreen);
