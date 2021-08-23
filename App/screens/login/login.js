import React, {useEffect, useState} from 'react';
import {
  useWindowDimensions,
  View,
  StatusBar,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';
import colors from '../../constants/colors';
import strings from '../../constants/strings';
import {showShortSnackBar} from '../../components/snackBar';
import screenNames from 'App/constants/screenNames';

export default function Login({navigation}) {
  const {height, width} = useWindowDimensions();
  const [noUser, setNoUser] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loadingIndicator, setLoadingIndicator] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const loginUser = async (userName, password) => {
    try {
      await auth().signInWithEmailAndPassword(userName, password);
      navigation.push(screenNames.home);
    } catch (error) {
      setLoadingIndicator(false);
      if (error.code === 'auth/user-not-found') {
        setNoUser(true);
        showShortSnackBar('Signup to continue');
      } else {
        showShortSnackBar('Error occurred.Please try again');
      }
    }
  };

  const newUser = async (userName, password) => {
    try {
      await auth().createUserWithEmailAndPassword(userName, password);
      navigation.push(screenNames.home);
    } catch (error) {
      setLoadingIndicator(false);
      if (error.code === 'auth/email-already-in-use') {
        showShortSnackBar('Email already in use.');
      }
      if (error.code === 'auth/invalid-email') {
        showShortSnackBar('That email address is invalid!');
      }
      if (error.code === 'auth/weak-password') {
        showShortSnackBar('Weak password.Please enter a strong password');
      }
    }
  };

  return (
    <View
      style={height > width ? portraitStyles.parent : landScapeStyles.parent}>
      <StatusBar barStyle="light-content" />
      <View
        style={
          height > width
            ? portraitStyles.logoParent
            : landScapeStyles.logoParent
        }>
        <Image
          style={
            height > width ? portraitStyles.tinyLogo : landScapeStyles.tinyLogo
          }
          resizeMode="contain"
          source={require('../../assets/images/picaday.png')}
        />
        <Text style={{color: colors.grey}}>{strings.TAG_LINE}</Text>
      </View>
      <View
        style={
          height > width
            ? portraitStyles.inputItems
            : landScapeStyles.inputItems
        }>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          value={userName}
          onChangeText={newText => setUserName(newText)}
          placeholder="email"
          placeholderTextColor="gray"
          returnKeyType="next"
          style={
            height > width
              ? portraitStyles.inputSelected
              : landScapeStyles.inputSelected
          }
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChangeText={newText => setPassword(newText)}
          textContentType="password"
          placeholder="password"
          placeholderTextColor="gray"
          returnKeyType="done"
          style={height > width ? portraitStyles.input : landScapeStyles.input}
        />
        <TouchableOpacity
          onPress={() => {
            if (userName !== '' && password !== '') {
              setLoadingIndicator(true);
              if (noUser) newUser(userName, password);
              else loginUser(userName, password);
            }
            // else {
            //   Toast.show(strings.ERROR_ALERT);
            // }
          }}
          style={
            height > width
              ? portraitStyles.loginButton
              : landScapeStyles.loginButton
          }>
          {loadingIndicator ? (
            <ActivityIndicator
              animating={loadingIndicator}
              style={
                height > width
                  ? portraitStyles.loadingIndicator
                  : landScapeStyles.loadingIndicator
              }
              size="small"
              color={colors.white}
            />
          ) : (
            <Text
              style={
                height > width
                  ? portraitStyles.loginText
                  : landScapeStyles.loginText
              }>
              {noUser ? strings.SIGN_UP : strings.SIGN_IN}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const portraitStyles = StyleSheet.create({
  parent: {},
  inputItems: {},
  tinyLogo: {
    height: 50,
    width: 100,
  },
  logoParent: {
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  inputSelected: {
    borderWidth: 1.5,
    borderColor: colors.appPrimary,
    marginTop: 16,
    marginHorizontal: 16,
    height: 42,
    padding: 10,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },
  input: {
    marginTop: 16,
    marginHorizontal: 16,
    height: 42,
    padding: 10,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },
  loginButton: {
    marginTop: 30,
    marginHorizontal: 16,
    height: 42,
    borderRadius: 8,
    elevation: 5,
    alignItems: 'center',
    backgroundColor: colors.appPrimary,
  },
  loginText: {
    color: colors.white,
    marginVertical: 12,
  },
  loadingIndicator: {
    marginVertical: 12,
  },
});

const landScapeStyles = StyleSheet.create({
  parent: {},
  inputItems: {alignSelf: 'center'},
  tinyLogo: {
    height: 30,
    width: 100,
  },
  logoParent: {
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  inputSelected: {
    borderWidth: 1.5,
    borderColor: colors.appPrimary,
    marginTop: 16,
    marginHorizontal: 16,
    height: 42,
    width: 400,
    padding: 10,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },
  input: {
    marginTop: 16,
    marginHorizontal: 16,
    height: 42,
    width: 400,
    padding: 10,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },
  loginButton: {
    marginTop: 30,
    marginHorizontal: 16,
    height: 42,
    width: 400,
    borderRadius: 8,
    elevation: 5,
    alignItems: 'center',
    backgroundColor: colors.appPrimary,
  },
  loginText: {
    color: colors.white,
    marginVertical: 12,
  },
  loadingIndicator: {
    marginVertical: 10,
  },
});
