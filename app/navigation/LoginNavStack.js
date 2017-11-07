"use strict";

import React from "react";
import { StackNavigator, TabNavigator } from "react-navigation";

import WalkthroughScreen from "../screens/Welcome/screens/WalkthroughScreen/WalkthroughScreen";
import LoginScreen from "../screens/Welcome/screens/LoginScreen/LoginScreen";
import SignupScreen from "../screens/Welcome/screens/SignupScreen/SignupScreen";
import RegistrationWalkthroughScreen from "../screens/Welcome/screens/UserRegistrationScreen/RegistrationWalkthroughScreen";

import MainInsetNavStack from "./MainInsetNavStack";

const loginNavOptions = {
  initialRouteName: "walkthrough",
  header: null
};

const LoginNavStack = StackNavigator(
  {
    // walkthrough: { screen: WalkthroughScreen },
    // login: { screen: LoginScreen },
    // signup: { screen: SignupScreen },
    userRegistration: { screen: RegistrationWalkthroughScreen },
    mainInsetNavStack: { screen: MainInsetNavStack }
  },
  {
    navigationOptions: loginNavOptions
  }
);

export default LoginNavStack;
