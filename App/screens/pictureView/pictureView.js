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

const PictureView = ({navigation}) => {
  const [{cameraRef}, {takePicture}] = useCamera(null);
  const {height, width} = useWindowDimensions();

  return (
    <View style={{flex: 1}}>
      <RNCamera style={{flex: 1}} ref={cameraRef} captureAudio={false}>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: 80,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            padding: 16,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              width: 50,
              borderRadius: 30,
              alignSelf: 'center',
              backgroundColor: colors.appPrimary,
            }}>
            <Icon name="ri-check-fill" size="26" color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={{alignSelf: 'center', marginRight: 28}}>
            <Icon name="ri-restart-line" size="26" color="white" />
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
});

export default PictureView;
