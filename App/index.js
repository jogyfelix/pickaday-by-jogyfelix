import React, {useEffect} from 'react';
import {Text} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <Text>Hello</Text>;
}
