import React from 'react';
import {useWindowDimensions, StatusBar, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import screenNames from 'App/constants/screenNames';

import login from '../screens/login/login';
import home from '../screens/home/home';
import homeNavigator from '../screens/home/homeNavigator';
import summary from '../screens/summary/summary';
import camera from '../screens/camera/camera';
import dayView from '../screens/dayView/dayView';
import dayViewEdit from '../screens/dayViewEdit/dayViewEdit';
import PictureView from '../screens/pictureView/pictureView';

import Icon from 'react-native-remix-icon';
import Fab from 'App/components/fab';

const MainStack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

export const MainStackScreen = () => (
  <NavigationContainer independent={true}>
    <MainStack.Navigator>
      <MainStack.Screen
        name={screenNames.login}
        component={login}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name={screenNames.homeNavigator}
        component={homeNavigator}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name={screenNames.dayView}
        component={dayView}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name={screenNames.dayViewEdit}
        component={dayViewEdit}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name={screenNames.pictureView}
        component={PictureView}
        options={{
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  </NavigationContainer>
);

export const TabsScreen = () => {
  return (
    <SafeAreaProvider>
      <BottomTabs.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}>
        <BottomTabs.Screen
          name={screenNames.home}
          component={home}
          options={{
            tabBarIcon: function tabIcon({focused}) {
              return (
                <View>
                  <Icon
                    name={focused ? 'ri-home-fill' : 'ri-home-line'}
                    size="28"
                    color="grey"></Icon>
                </View>
              );
            },
          }}
        />
        <BottomTabs.Screen
          name={screenNames.camera}
          component={camera}
          options={{
            tabBarStyle: {
              display: 'none',
            },
            tabBarButton: function tabButton(props) {
              return <Fab {...props} />;
            },
          }}
        />
        <BottomTabs.Screen
          name={screenNames.summary}
          component={summary}
          options={{
            tabBarIcon: function tabIcon({focused}) {
              return (
                <View>
                  <Icon
                    name={
                      focused ? 'ri-information-fill' : 'ri-information-line'
                    }
                    size="28"
                    color="grey"></Icon>
                </View>
              );
            },
          }}
        />
      </BottomTabs.Navigator>
    </SafeAreaProvider>
  );
};
