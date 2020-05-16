import React, {useState, useEffect} from 'react';
import {
  Image,
  Linking,
  FlatList,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
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

  const onPressBlogs = type => {
    navigation.navigate('EcoBlogs', {type});
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TouchableOpacity style={{flex: 1}} onPress={() => onPressBlogs('casino')}>
          <Image
            style={{width: deviceWidth / 2, height: '100%'}}
            source={require('../../assets/casino.jpg')}
          />
          <View style={styles.textWrapper}>
            <Text style={styles.text}>Game</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1}} onPress={() => onPressBlogs('island')}>
          <Image
            style={{width: deviceWidth / 2, height: '100%'}}
            source={require('../../assets/island.jpg')}
          />
          <View style={styles.textWrapper}>
            <Text style={styles.text}>Resort</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{flex: 1}} onPress={() => onPressBlogs('hotel')}>
        <Image
          style={{width: deviceWidth, height: '100%'}}
          source={require('../../assets/hotel.jpg')}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.text}>Hotel</Text>
        </View>
      </TouchableOpacity>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TouchableOpacity style={{flex: 1}} onPress={() => onPressBlogs('yacht')}>
          <Image
            style={{width: deviceWidth / 2, height: '100%'}}
            source={require('../../assets/yacht.jpg')}
          />
          <View style={styles.textWrapper}>
            <Text style={styles.text}>Yacht</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1}} onPress={() => onPressBlogs('travel')}>
          <Image
            style={{width: deviceWidth / 2, height: '100%'}}
            source={require('../../assets/travel.jpg')}
          />
          <View style={styles.textWrapper}>
            <Text style={styles.text}>Travel</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{flex: 1}} onPress={() => onPressBlogs('otc')}>
        <Image
          style={{width: deviceWidth, height: '100%'}}
          source={require('../../assets/otc.jpg')}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.text}>OTC</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
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
