import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ErrorBoundary from './Components/ErrorBoundary';
import SplashScreen from './Screens/SplashScreen';
import DynamicForm from './Screens/DynamicForm';
import ListingScreen from './Screens/ListingScreen';
import DisplayScreen from './Screens/DisplayScreen';
import { Easing } from 'react-native';
import { appConfig } from './config';

const Stack = createNativeStackNavigator();
const INITIAL_ROUTE = 'SplashScreen';

export const customAnimation = {
    animation: appConfig?.animations?.screenSlideAnimation,
    gestureEnabled: true,
    transitionSpec: {
      open: {
        animation: 'timing',
        config: {
          duration: 500,
          easing: Easing.out(Easing.exp),
        },
      },
      close: {
        animation: 'timing',
        config: {
          duration: 500,
          easing: Easing.in(Easing.exp),
        },
      },
    },
};

const AppNavigator = () => {
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false, ...customAnimation}}
          initialRouteName={INITIAL_ROUTE}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="DynamicForm" component={DynamicForm} />
          <Stack.Screen name="ListingScreen" component={ListingScreen} />
          <Stack.Screen name="DisplayScreen" component={DisplayScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
};

export default AppNavigator;
