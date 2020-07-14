import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Alert, StyleSheet, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {web3, tronWeb, bitbox} from '../../services/wallet';

import SquareMask from '../../components/SquareMask';
import Locale from 'ewallet/src/locales';

const ScannerScreen = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(false);
  const onScan = ({data}) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    if (!isLoading && data) {
      const address = data.replace('ethereum:', '');
      if (
        web3.utils.isAddress(address) ||
        tronWeb.isAddress(address) ||
        // bitbox.Address.isMainnetAddress(address) ||
        address.startsWith('1') ||
        address.startsWith('3') ||
        address.startsWith('b') ||
        address.startsWith('q')
      ) {
        navigation.reset({
          index: 1,
          routes: [
            {name: 'Wallet'},
            {name: 'Send', params: {receiver: address}},
          ],
        });
      } else {
        Alert.alert(
          Locale['TEXT__GENERAL_WARNING'],
          Locale['MSG__INVALID_ADDRESS_FORMAT'],
          [{text: 'OK', onPress: () => setIsLoading(false)}],
        );
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        androidCameraPermissionOptions={{
          title: Locale['TEXT__REQUEST_CAMERA_PERMISSION'],
          message: Locale['DESC__REQUEST_CAMERA_PERMISSION'],
        }}
        permissionDialogTitle={Locale['TEXT__REQUEST_CAMERA_PERMISSION']}
        permissionDialogMessage={Locale['DESC__REQUEST_CAMERA_PERMISSION']}
        captureAudio={false}
        onBarCodeRead={onScan}>
        <SquareMask />
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  floatingText: {
    marginHorizontal: 24,
    color: 'white',
    position: 'absolute',
    bottom: 35,
    fontSize: 15,
    letterSpacing: -0.09,
    alignSelf: 'center',
    textAlign: 'center',
  },
});

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScannerScreen);
