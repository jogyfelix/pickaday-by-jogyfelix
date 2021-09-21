import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import Icon from 'react-native-remix-icon';
import colors from '../../constants/colors';
import RNFS from 'react-native-fs';
import screenNames from 'App/constants/screenNames';

const camera = ({navigation}) => {
  const [{cameraRef}, {takePicture}] = useCamera(null);
  const {height, width} = useWindowDimensions();

  const captureHandle = async () => {
    try {
      const defPath = await takePicture();
      const newPath = RNFS.ExternalDirectoryPath + '/' + Math.random() + '.jpg';
      RNFS.moveFile(defPath.uri, newPath);
      await navigation.push(screenNames.pictureView, {
        screen: screenNames.home,
        params: {path: newPath},
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.parent}>
      <RNCamera style={styles.parent} ref={cameraRef} captureAudio={false}>
        <View style={styles.subParent}>
          <TouchableOpacity style={styles.flashTouch}>
            <Icon name="ri-flashlight-line" size="26" color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.click} onPress={captureHandle}>
            <Icon name="ri-camera-lens-line" size="26" color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.switch}>
            <Icon name="ri-camera-switch-line" size="26" color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={width > height ? styles.backLand : styles.backPort}
          onPress={() => navigation.goBack()}>
          <Icon name="ri-arrow-left-s-line" size="20" color="white" />
        </TouchableOpacity>
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  backLand: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    elevation: 100,
  },
  backPort: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },
  parent: {flex: 1},
  subParent: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flashTouch: {alignSelf: 'center', marginLeft: 28},
  click: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 30,
    alignSelf: 'center',
    backgroundColor: colors.appPrimary,
  },
  switch: {alignSelf: 'center', marginRight: 28},
});

export default camera;
