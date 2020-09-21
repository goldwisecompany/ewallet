import React, {useEffect} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Button, ListItem, Text} from 'react-native-elements';
import {updateBlogs} from '../../actions/index';

const PRNC = require('../../assets/imgPRN.png');

const SplashScreen = ({
  navigation,
  isGenerating,
  myWallets,
  updateBlogsConnect,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: myWallets.length === 0 ? 'Launch' : 'Main'}],
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchBlogArticles = async () => {
      try {
        const res = await fetch('https://pranceworld.site/api/blogs');
        const data = await res.json();
        updateBlogsConnect(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogArticles();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={PRNC} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 150,
    height: 150,
  },
});

const mapStateToProps = state => ({
  myWallets: state.wallet.myWallets,
  isGenerating: state.wallet.isGenerating,
});

const mapDispatchToProps = {
  updateBlogsConnect: updateBlogs,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SplashScreen);
