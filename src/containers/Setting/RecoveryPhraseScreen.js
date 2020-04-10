import React from 'react';
import {
  Alert,
  Clipboard,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Icon, Text} from 'react-native-elements';

const RecoveryPhraseScreen = ({navigation, route}) => {
  const {phrase} = route.params;

  const copyToClipboard = async text => {
    await Clipboard.setString(text);
    Alert.alert('', 'Recovery Phrase Copied!');
  };

  return (
    <View style={styles.container}>
      <View style={{width: '60%'}}>
        <Text style={{color: 'red'}}>
          {
            'Warning: Never disclose this key. Anyone with your private keys can steal any assets held in your account.'
          }
        </Text>
      </View>
      <View style={styles.phraseContainer}>
        <Text>{phrase}</Text>
      </View>
      <TouchableOpacity
        style={{justifyContent: 'center', alignItems: 'center'}}
        onPress={() => copyToClipboard(phrase)}>
        <Icon name="content-copy" size={50} />
        <Text>Copy</Text>
      </TouchableOpacity>
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
  phraseContainer: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50,
    backgroundColor: 'lightblue',
    padding: 40,
    borderRadius: 20,
  },
});

export default RecoveryPhraseScreen;
