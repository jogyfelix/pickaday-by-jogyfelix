import React, {useEffect, useState, useRef} from 'react';
import {useWindowDimensions, View, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';
import {theme} from 'App/theme';
import strings from '../../constants/strings';
import {showShortSnackBar} from '../../components/snackBar';
import screenNames from 'App/constants/screenNames';
import {LogoContainer, LoginInputContainer} from '../../styles/wrappers';
import {LogoImage} from '../../styles/images';
import {LogoText} from '../../styles/texts';
import {LoginInput} from '../../styles/inputs';
import {LoginButton} from '../../styles/buttons';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import actionTypes from 'App/constants/actionTypes';

// eslint-disable-next-line react/prop-types
function Login({navigation}) {
  const dispatch = useDispatch();
  const {height, width} = useWindowDimensions();
  const [noUser, setNoUser] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loadingIndicator, setLoadingIndicator] = useState(false);
  const userNameInputRef = useRef();
  const passwordInputRef = useRef();

  const focusUserInput = () => userNameInputRef.current.focus();
  const focusPasswordInput = () => passwordInputRef.current.focus();

  useEffect(() => {
    SplashScreen.hide();
    focusUserInput();
  }, []);

  const loginUser = async (userName, password) => {
    try {
      const user = await auth().signInWithEmailAndPassword(userName, password);
      const userDetail = {email: user.user.email, uid: user.user.uid};
      // setUserDetails(userDetail);
      dispatch({type: actionTypes.SET_USER, payload: userDetail});
      navigation.push(screenNames.homeNavigator, {
        screen: screenNames.home,
      });

      setLoadingIndicator(false);
    } catch (error) {
      setLoadingIndicator(false);
      if (error.code === 'auth/user-not-found') {
        setNoUser(true);
        showShortSnackBar('Signup to continue');
      } else {
        showShortSnackBar(strings.WRONG_ALERT);
      }
    }
  };

  const newUser = async (userName, password) => {
    try {
      const user = await auth().createUserWithEmailAndPassword(
        userName,
        password,
      );

      const currentDate = firestore.Timestamp.fromDate(new Date());

      firestore().collection('Users').add({
        email: user.user.email,
        uid: user.user.uid,
        date: currentDate,
      });
      const userDetail = {email: user.user.email, uid: user.user.uid};
      // setUserDetails(userDetail);
      dispatch({type: actionTypes.SET_USER, payload: userDetail});
      navigation.push(screenNames.homeNavigator, {
        screen: screenNames.home,
      });
      setLoadingIndicator(false);
    } catch (error) {
      setLoadingIndicator(false);
      if (error.code === 'auth/email-already-in-use') {
        showShortSnackBar(strings.EMAIL_IN_USE);
        setNoUser(false);
      }
      if (error.code === 'auth/invalid-email') {
        showShortSnackBar(strings.EMAIL_INVALID);
      }
      if (error.code === 'auth/weak-password') {
        showShortSnackBar(strings.WEAK_PASSWORD);
      }
    }
  };

  return (
    <View>
      <StatusBar barStyle="light-content" />
      <LogoContainer landscapeMode={height > width ? false : true}>
        <LogoImage
          landscapeMode={height > width ? false : true}
          resizeMode="contain"
          source={require('../../assets/images/picaday.png')}
        />
        <LogoText>{strings.TAG_LINE}</LogoText>
      </LogoContainer>
      <LoginInputContainer landscapeMode={height > width ? false : true}>
        <LoginInput
          autoCapitalize="none"
          ref={userNameInputRef}
          autoCorrect={false}
          value={userName}
          onChangeText={newText => setUserName(newText)}
          placeholder="email"
          placeholderTextColor="gray"
          returnKeyType="next"
          landscapeMode={height > width ? false : true}
          onSubmitEditing={focusPasswordInput}
        />
        <LoginInput
          autoCapitalize="none"
          ref={passwordInputRef}
          autoCorrect={false}
          value={password}
          onChangeText={newText => setPassword(newText)}
          textContentType="password"
          placeholder="password"
          placeholderTextColor="gray"
          returnKeyType="done"
          password
          landscapeMode={height > width ? false : true}
        />
        <LoginButton
          onPress={() => {
            if (userName !== '' && password !== '') {
              setLoadingIndicator(true);
              if (noUser) newUser(userName, password);
              else loginUser(userName, password);
            } else {
              showShortSnackBar('Please enter email/password');
            }
          }}
          landscapeMode={height > width ? false : true}
          loadingIndicator={loadingIndicator}
          size="small"
          color={theme.colors.white}
          text={noUser ? strings.SIGN_UP : strings.SIGN_IN}
        />
      </LoginInputContainer>
    </View>
  );
}

// export default connect(null, actions)(Login);

export default Login;
