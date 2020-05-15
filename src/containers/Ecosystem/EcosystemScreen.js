import React, {useState, useEffect} from 'react';
import {
  Image,
  Linking,
  FlatList,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {createWallet} from '../../actions/index';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const EcosystemScreen = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await fetch('https://pranceworld.site/api/ecoBlogs');
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPI();
  }, []);

  return (
    <View style={styles.container}>
      {data &&
        data.map(blogItem => (
          <View style={{flex: 1}} key={blogItem.id}>
            <Image
              style={{width: deviceWidth, height: '100%'}}
              source={{uri: blogItem.image}}
            />
            <View style={styles.textWrapper}>
              <Text style={styles.text}>{blogItem.type}</Text>
            </View>
          </View>
        ))}
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
)(EcosystemScreen);
