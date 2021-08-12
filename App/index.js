import React, {useEffect} from 'react';
import {
  View,
  StatusBar,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import colors from './constants/colors';
import strings from './constants/strings';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.parent}>
      <StatusBar barStyle="light-content" />
      <View style={styles.logoParent}>
        <Image
          style={styles.tinyLogo}
          resizeMode="contain"
          source={require('./assets/images/picaday.png')}
        />
        <Text style={{color: colors.grey}}>{strings.TAG_LINE}</Text>
      </View>
      <View>
        <TextInput
          placeholder="email"
          placeholderTextColor="gray"
          returnKeyType="next"
          style={styles.inputSelected}
        />
        <TextInput
          placeholder="password"
          placeholderTextColor="gray"
          returnKeyType="done"
          style={styles.input}
        />
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>{strings.SIGN_IN}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {},
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
});
