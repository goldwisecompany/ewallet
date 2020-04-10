import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

const {width: VIEWPOINT_WIDTH} = Dimensions.get('window');

const SquareMask = () => {
  const areaScale = 0.6;
  const sideLength = VIEWPOINT_WIDTH * areaScale;

  return (
    <View style={styles.container}>
      <View style={styles.maskOutter}>
        <View style={[styles.maskRow, styles.maskFrame]} />
        <View style={[{height: sideLength}, styles.maskCenter]}>
          <View
            style={[
              {width: (VIEWPOINT_WIDTH * (1 - areaScale)) / 2},
              styles.maskFrame,
            ]}
          />
          <View style={[styles.maskInner, {width: sideLength}]} />
          <View
            style={[
              {width: (VIEWPOINT_WIDTH * (1 - areaScale)) / 2},
              styles.maskFrame,
            ]}
          />
        </View>
        <View style={[styles.maskRow, styles.maskFrame]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraView: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
  },
  maskInner: {
    backgroundColor: 'transparent',
  },
  maskFrame: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: -1,
  },
  maskRow: {
    flex: 1,
    width: '100%',
  },
  maskCenter: {
    flexDirection: 'row',
  },
  gradientWrapper: {
    height: '100%',
  },
  gradient: {
    height: '100%',
  },
});

export default SquareMask;
