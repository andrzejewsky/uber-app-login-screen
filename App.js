import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './src/screens/Login';

const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
  }
});


export default createAppContainer(AppNavigator);
