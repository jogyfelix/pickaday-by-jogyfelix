import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ImageBackground,
  BackHandler,
  Alert,
} from 'react-native';
import Icon from 'react-native-remix-icon';
import colors from '../../constants/colors';
import RNFS from 'react-native-fs';

const PictureView = ({route, navigation}) => {
  const {height, width} = useWindowDimensions();
  const imageLoc = 'file://' + route.params.params.path;

  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: () => {
          delteFiles(imageLoc);
          navigation.goBack();
        },
      },
    ]);
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  const delteFiles = async filepath => {
    let exists = await RNFS.exists(filepath);
    if (exists) {
      // exists call delete
      await RNFS.unlink(filepath);
      console.log('File Deleted');
    } else {
      console.log('File Not Available');
    }
  };
  return (
    <View style={styles.parent}>
      <ImageBackground
        style={styles.imgParent}
        resizeMode="cover"
        source={{uri: imageLoc}}>
        <View style={styles.subParent}>
          <TouchableOpacity style={styles.click}>
            <Icon name="ri-check-fill" size="26" color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switch}
            onPress={() => {
              delteFiles(imageLoc);
              navigation.goBack();
            }}>
            <Icon name="ri-restart-line" size="26" color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={width > height ? styles.backLand : styles.backPort}
          onPress={() => {
            delteFiles(imageLoc);
            navigation.goBack();
          }}>
          <Icon name="ri-arrow-left-s-line" size="20" color="white" />
        </TouchableOpacity>
      </ImageBackground>
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
    justifyContent: 'space-around',
  },
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
  imgParent: {flex: 1, width: '100%', height: '100%'},
});

export default PictureView;
