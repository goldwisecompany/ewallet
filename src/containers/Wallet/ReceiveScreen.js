import React, {useState} from 'react';
import {
  Alert,
  Clipboard,
  View,
  Share,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// import {Picker} from '@react-native-community/picker';
import {connect} from 'react-redux';
import {Icon, Text} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import QRCode from 'react-native-qrcode-svg';
import {colors} from '../../styles';
import Locale from 'ewallet/src/locales';

const ReceiveScreen = ({navigation, route, myWallets, current}) => {
  const [coin, setCoin] = useState(
    (route.params && route.params.coin) || 'PRN',
  );

  const copyToClipboard = async text => {
    await Clipboard.setString(text);
    Alert.alert('', Locale['MSG__ADDRESS_COPIED']);
  };

  const shareAddress = text => {
    Share.share({message: text});
  };

  return (
    <View style={styles.container}>
      <View style={styles.picker}>
        <RNPickerSelect
          onValueChange={value => setCoin(value)}
          style={pickerSelectStyles}
          placeholder={{}}
          value={coin}
          items={[
            {label: 'PRN', value: 'PRN'},
            {label: 'BTC', value: 'BTC'},
            {label: 'ETH', value: 'ETH'},
            {label: 'TRX', value: 'TRX'},
            {label: 'USDT', value: 'USDT'},
          ]}
          useNativeAndroidPickerStyle={false}
          Icon={() => {
            return <Ionicons name="md-arrow-down" size={20} color="gray" />;
          }}
        />
      </View>
      <View style={styles.addressWrapper}>
        <Text style={styles.address}>{myWallets[current][coin].address}</Text>
      </View>
      <QRCode value={myWallets[current][coin].address} size={200} />
      <View style={styles.iconGroup}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => shareAddress(myWallets[current][coin].address)}>
          <Icon name="share" size={50} />
          <Text>{Locale['TEXT__SHARE']}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => copyToClipboard(myWallets[current][coin].address)}>
          <Icon name="content-copy" size={50} />
          <Text>{Locale['TEXT__COPY']}</Text>
        </TouchableOpacity>
      </View>
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
  picker: {
    width: 100,
    borderWidth: 1,
    borderColor: colors.mainDark,
    borderRadius: 5,
  },
  addressWrapper: {
    marginVertical: 20,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  address: {
    textAlign: 'center',
  },
  iconGroup: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 40,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    width: 40,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
)(ReceiveScreen);
