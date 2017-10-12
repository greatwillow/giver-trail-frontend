'use strict';
import { StackNavigator } from 'react-navigation';

import WalkthroughScreen from '../screens/Welcome/screens/WalkthroughScreen';
import LoginScreen from '../screens/Main/screens/Login/LoginScreen';
import SignupScreen from '../screens/Main/screens/Signup/SignupScreen';
import UserRegistrationScreen from '../screens/Main/screens/UserRegistration/UserRegistrationScreen';

const AppNavigator = StackNavigator({
  walkthrough: { screen: WalkthroughScreen },
  login: { screen: LoginScreen },
  signup: { screen: SignupScreen },
  registration: { screen: UserRegistrationScreen },

});

export default AppNavigator;
