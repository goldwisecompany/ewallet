import React from 'react';
import {
  Alert,
  Clipboard,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import Locale from 'ewallet/src/locales';

const RecoveryPhraseScreen = ({navigation, route}) => {
  const {phrase} = route.params;

  const copyToClipboard = async text => {
    await Clipboard.setString(text);
    Alert.alert('', Locale['MSG__RECOVERY_PHRASE_COPIED']);
  };

  return (
    <View style={styles.container}>
      <View style={{width: '60%'}}>
        <Text style={{color: 'red'}}>
          {`${Locale['TEXT__GENERAL_WARNING']}: ${
            Locale['HINT__ABOUT_PASSWORD']
          }`}
        </Text>
      </View>
      <View style={styles.phraseContainer}>
        <Text>{phrase}</Text>
      </View>
      <TouchableOpacity
        style={{justifyContent: 'center', alignItems: 'center'}}
        onPress={() => copyToClipboard(phrase)}>
        <Icon name="content-copy" size={50} />
        <Text>{Locale['TEXT__COPY']}</Text>
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
