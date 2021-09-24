import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ImageBackground,
  BackHandler,
} from 'react-native';
import Icon from 'react-native-remix-icon';
import colors from '../../constants/colors';
import RNFS from 'react-native-fs';
import {getLocation} from 'App/utils/getLocation';
import {getLocationDetails, getweatherDetails} from '../../utils/apis';
import screenNames from 'App/constants/screenNames';
import firestore from '@react-native-firebase/firestore';
import {showShortSnackBar} from '../../components/snackBar';
import strings from 'App/constants/strings';
import {BackButton} from 'App/styles/backButton';

const PictureView = ({route, navigation}) => {
  const {height, width} = useWindowDimensions();
  const imageDefPath = route.params.params.path;
  const imageLoc = 'file://' + imageDefPath;

  const save = async () => {
    try {
      const location = await getLocation();
      const place = await getLocationDetails(
        location.coords.latitude,
        location.coords.longitude,
      );
      const weather = await getweatherDetails(
        location.coords.latitude,
        location.coords.longitude,
      );
      const date = firestore.Timestamp.fromDate(new Date());

      navigation.push(screenNames.dayViewEdit, {
        screen: screenNames.dayViewEdit,
        params: {
          image: imageLoc,
          location: place.data.address.state,
          temperature: weather.data.main.temp,
          date: date,
        },
      });
    } catch (error) {
      showShortSnackBar(strings.WRONG_ALERT);
    }
  };

  const backAction = () => {
    delteFiles(imageLoc);
    navigation.goBack();
    return true;
  };

  BackHandler.addEventListener('hardwareBackPress', backAction);

  const delteFiles = async filepath => {
    let exists = await RNFS.exists(filepath);
    if (exists) {
      // exists call delete
      await RNFS.unlink(filepath);
    } else {
      showShortSnackBar(strings.FILE_NOT_AVAILABLE);
    }
  };
  return (
    <View style={styles.parent}>
      <ImageBackground
        style={styles.imgParent}
        resizeMode="cover"
        source={{uri: imageLoc}}>
        <View style={styles.subParent}>
          <TouchableOpacity style={styles.click} onPress={save}>
            <Icon name="ri-check-fill" size="26" color="white" />
          </TouchableOpacity>
        </View>

        <BackButton
          landScapeMode={height > width ? false : true}
          editView={false}
          onPress={() => {
            delteFiles(imageLoc);
            navigation.goBack();
          }}>
          <Icon name="ri-arrow-left-s-line" size="20" color="white" />
        </BackButton>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
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
