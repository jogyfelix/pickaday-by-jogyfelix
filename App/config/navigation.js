import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import login from '../screens/login/login';

const MainStack = createStackNavigator();
const MainStackScreen = () => (
  <NavigationContainer>
    <MainStack.Navigator>
      <MainStack.Screen
        name="Login"
        component={login}
        options={{
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  </NavigationContainer>
);

export default MainStackScreen;
