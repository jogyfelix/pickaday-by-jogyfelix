import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import screenNames from 'App/constants/screenNames';

import login from '../screens/login/login';
import home from '../screens/home/home';

const MainStack = createStackNavigator();
const MainStackScreen = () => (
  <NavigationContainer>
    <MainStack.Navigator>
      <MainStack.Screen
        name={screenNames.login}
        component={login}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name={screenNames.home}
        component={home}
        options={{
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  </NavigationContainer>
);

export default MainStackScreen;
