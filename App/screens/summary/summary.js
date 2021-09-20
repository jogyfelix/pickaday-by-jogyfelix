import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Alert,
} from 'react-native';
import colors from '../../constants/colors';
import screenNames from '../../constants/screenNames';
import firestore from '@react-native-firebase/firestore';
import {showShortSnackBar} from '../../components/snackBar';
import {format} from 'date-fns';

const summary = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const [highestTemp, setHighestTemp] = useState({});
  const [lowestTemp, setLowestTemp] = useState({});
  const [userData, setUserData] = useState({});

  const logoutUser = () => {
    Alert.alert('Logout', 'you will be logged out', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate(screenNames.login);
        },
      },
    ]);
  };

  const getData = async () => {
    try {
      const highestTempData = await firestore()
        .collection('daysDetails')
        // .where('uid', '==', 'nFZr79ZlUlcf6z4lTwMxKY8WfTx1')
        .orderBy('temperature', 'desc')
        .limit(1)
        .get();

      highestTempData.forEach(querySnapshot => {
        setHighestTemp(querySnapshot.data());
      });

      const lowestTempData = await firestore()
        .collection('daysDetails')
        .orderBy('temperature', 'asc')
        .limit(1)
        // .where('uid', '==', 'nFZr79ZlUlcf6z4lTwMxKY8WfTx1')
        .get();

      lowestTempData.forEach(querySnapshot => {
        setLowestTemp(querySnapshot.data());
      });

      const userDetails = await firestore()
        .collection('Users')
        .where('uid', '==', 'nFZr79ZlUlcf6z4lTwMxKY8WfTx1')
        .get();

      userDetails.forEach(querySnapshot => {
        setUserData(querySnapshot.data());
      });
    } catch (error) {
      console.log(error);
      showShortSnackBar('Something went wrong.Please try again');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const formatDate = flag => {
    if (flag === 'high') {
      if (highestTemp.date === undefined) return '';
      else
        return format(new Date(highestTemp.date.toDate()), 'EEEE,MMM dd,yyyy');
    } else {
      if (lowestTemp.date === undefined) return '';
      else
        return format(new Date(lowestTemp.date.toDate()), 'EEEE,MMM dd,yyyy');
    }
  };

  const formatRecordedDays = () => {
    if (userData.date === undefined) return '';
    else {
      const startDate = new Date(userData.date.toDate());
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
  };

  return (
    <ScrollView
      style={
        width > height ? landScapeStyle.parentView : portraitStyle.parentView
      }>
      <Image
        style={portraitStyle.imageTitle}
        resizeMode="contain"
        source={require('../../assets/images/picaday.png')}
      />
      <View style={width > height ? landScapeStyle.twoViewParent : {}}>
        <View
          style={
            width > height
              ? landScapeStyle.childViewParent
              : portraitStyle.childViewParent
          }>
          <Text style={portraitStyle.childTitle}>Days</Text>
          <Text style={portraitStyle.childValue}>
            17/{formatRecordedDays()}
          </Text>
          <Text style={portraitStyle.childDetails}>
            You have recorded 17 days since the first day
          </Text>
        </View>
        <View
          style={
            width > height
              ? landScapeStyle.childViewParent
              : portraitStyle.childViewParent
          }>
          <Text style={portraitStyle.childTitle}>Hottest day</Text>
          <Text style={portraitStyle.childValue}>
            {highestTemp.temperature}°
          </Text>
          <Text style={portraitStyle.childDetails}>{formatDate('high')}</Text>
        </View>
      </View>

      <View
        style={
          width > height
            ? landScapeStyle.childViewParent
            : portraitStyle.childViewParent
        }>
        <Text style={portraitStyle.childTitle}>Coldest day</Text>
        <Text style={portraitStyle.childValue}>{lowestTemp.temperature}°</Text>
        <Text style={portraitStyle.childDetails}> {formatDate('low')}</Text>
      </View>
      <TouchableOpacity style={portraitStyle.buttonStyle} onPress={logoutUser}>
        <Text style={portraitStyle.buttonText}>LOGOUT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const landScapeStyle = StyleSheet.create({
  parentView: {backgroundColor: colors.offWhite},
  imageTitle: {
    height: 50,
    width: 100,
    alignSelf: 'center',
    marginVertical: 24,
  },
  twoViewParent: {flexDirection: 'row'},
  childViewParent: {
    height: 150,
    width: 350,
    marginHorizontal: 16,
    marginVertical: 8,
    borderColor: colors.border,
    backgroundColor: colors.white,
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 4,
    alignSelf: 'center',
  },
  childTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.grey,
    textAlign: 'center',
  },
  childValue: {
    fontSize: 56,
    fontWeight: 'bold',
    color: colors.darkGrey,
    textAlign: 'center',
  },
  childDetails: {
    fontSize: 12,
    color: colors.grey,
    textAlign: 'center',
  },
  buttonStyle: {
    borderColor: colors.appPrimary,
    borderWidth: 1,
    width: 80,
    height: 28,
    borderRadius: 4,
    alignSelf: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: colors.appPrimary,
    textAlign: 'center',
    paddingVertical: 2,
  },
});

const portraitStyle = StyleSheet.create({
  parentView: {flex: 1, backgroundColor: colors.offWhite},
  imageTitle: {
    height: 50,
    width: 100,
    alignSelf: 'center',
    marginVertical: 24,
  },
  childViewParent: {
    height: 140,
    marginHorizontal: 16,
    marginVertical: 8,
    borderColor: colors.border,
    backgroundColor: colors.white,
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 4,
  },
  childTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.grey,
    textAlign: 'center',
  },
  childValue: {
    fontSize: 56,
    fontWeight: 'bold',
    color: colors.darkGrey,
    textAlign: 'center',
  },
  childDetails: {
    fontSize: 12,
    color: colors.grey,
    textAlign: 'center',
  },
  buttonStyle: {
    borderColor: colors.appPrimary,
    borderWidth: 1,
    width: 80,
    height: 28,
    borderRadius: 4,
    alignSelf: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: colors.appPrimary,
    textAlign: 'center',
    paddingVertical: 2,
  },
});

export default summary;
