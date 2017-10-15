'use strict';
import { StackNavigator, TabNavigator } from 'react-navigation';

import WalkthroughScreen from '../screens/Welcome/screens/WalkthroughScreen';
import LoginScreen from '../screens/Main/screens/LoginScreen/LoginScreen';
import SignupScreen from '../screens/Main/screens/SignupScreen/SignupScreen';
import UserRegistrationScreen from '../screens/Main/screens/UserRegistrationScreen/UserRegistrationScreen';

import MainInsetNavStack from './MainInsetNavStack';

const navigationOptions = {
  initialRouteName: 'walkthrough',
  headerStyle: {
    backgroundColor: '#000',
    height: 50,
    justifyContent: 'flex-end',
    elevation: 0,
  },
  headerTitleStyle: {
    color: '#FFFFFF',
    justifyContent: 'flex-end',
  },
  headerTintColor: '#FFFFFF',
};

const LoginNavStack = StackNavigator({
  walkthrough:      { screen: WalkthroughScreen },
  login:            { screen: LoginScreen },
  signup:           { screen: SignupScreen },
  registration:     { screen: UserRegistrationScreen },
  mainInsetNavStack: { screen: MainInsetNavStack }
}, {
  navigationOptions
});

export default LoginNavStack;
