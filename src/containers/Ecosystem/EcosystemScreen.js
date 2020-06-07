import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {createWallet} from '../../actions/index';

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
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.scene}
          onPress={() => onPressBlogs('casino')}>
          <Image
            style={styles.halfImage}
            source={require('../../assets/casino.jpg')}
          />
          <View style={styles.textWrapper}>
            <Text style={styles.text}>Game</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.scene}
          onPress={() => onPressBlogs('island_vacation')}>
          <Image
            style={styles.halfImage}
            source={require('../../assets/island.jpg')}
          />
          <View style={styles.textWrapper}>
            <Text style={styles.text}>Resort</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.scene}
        onPress={() => onPressBlogs('hotel')}>
        <Image
          style={styles.fullImage}
          source={require('../../assets/hotel.jpg')}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.text}>Hotel</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.scene}
          onPress={() => onPressBlogs('yacht')}>
          <Image
            style={styles.halfImage}
            source={require('../../assets/yacht.jpg')}
          />
          <View style={styles.textWrapper}>
            <Text style={styles.text}>Yacht</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.scene}
          onPress={() => onPressBlogs('travel')}>
          <Image
            style={styles.halfImage}
            source={require('../../assets/travel.jpg')}
          />
          <View style={styles.textWrapper}>
            <Text style={styles.text}>Travel</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.scene}
        onPress={() => onPressBlogs('coin_dealer')}>
        <Image
          style={styles.fullImage}
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
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  halfImage: {
    width: deviceWidth / 2,
    height: '100%',
  },
  fullImage: {
    width: deviceWidth,
    height: '100%',
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
    fontSize: 14,
    marginLeft: 10,
    elevation: 2,
    zIndex: 2,
    color: 'white',
    fontWeight: '600',
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
