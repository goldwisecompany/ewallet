import React from 'react';
import {Dimensions, Image, View, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Text} from 'react-native-elements';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const EcoDetailScreen = ({navigation, route, myWallets, current}) => {
  return (
    <ScrollView style={styles.container}>
      <Image
        style={{width: deviceWidth, height: deviceHeight / 4}}
        source={{uri: route.params.blog.image}}
      />
      <View style={{margin: 20}}>
        <View style={{marginBottom: 20}}>
          <Text style={{fontWeight: '700', fontSize: 20}}>
            {route.params.blog.title}
          </Text>
        </View>
        <Text>{route.params.blog.body}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const mapStateToProps = state => ({
  myWallets: state.wallet.myWallets,
  current: state.wallet.current,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EcoDetailScreen);
