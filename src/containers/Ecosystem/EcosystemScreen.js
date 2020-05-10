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
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Image
          style={{width: deviceWidth, height: '100%'}}
          source={require('../../assets/casino.jpg')}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.text}>Game</Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        <Image
          style={{width: deviceWidth, height: '100%'}}
          source={require('../../assets/travel.jpg')}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.text}>Travel</Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        <Image
          style={{width: deviceWidth, height: '100%'}}
          source={require('../../assets/hotel.jpg')}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.text}>Hotel</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
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
