import React from 'react';
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

const summary = ({navigation}) => {
  const {height, width} = useWindowDimensions();

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
          <Text style={portraitStyle.childValue}>17/19</Text>
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
          <Text style={portraitStyle.childValue}>39°</Text>
          <Text style={portraitStyle.childDetails}>Sun,Jan 12,2021</Text>
        </View>
      </View>

      <View
        style={
          width > height
            ? landScapeStyle.childViewParent
            : portraitStyle.childViewParent
        }>
        <Text style={portraitStyle.childTitle}>Coldest day</Text>
        <Text style={portraitStyle.childValue}>21°</Text>
        <Text style={portraitStyle.childDetails}>Mon,Jan 1,2021</Text>
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
