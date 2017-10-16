"use strict";

import React from "react";
import { StackNavigator, TabNavigator } from "react-navigation";

import WalkthroughScreen from "../screens/Welcome/screens/WalkthroughScreen";
import LoginScreen from "../screens/Main/screens/LoginScreen/LoginScreen";
import SignupScreen from "../screens/Main/screens/SignupScreen/SignupScreen";
import UserRegistrationScreen from "../screens/Main/screens/UserRegistrationScreen/UserRegistrationScreen";

import MainInsetNavStack from "./MainInsetNavStack";

const loginNavOptions = {
  initialRouteName: "walkthrough",
  header: null
};

const LoginNavStack = StackNavigator(
  {
    walkthrough: { screen: WalkthroughScreen },
    login: { screen: LoginScreen },
    signup: { screen: SignupScreen },
    userRegistration: { screen: UserRegistrationScreen },
    mainInsetNavStack: { screen: MainInsetNavStack }
  },
  {
    navigationOptions: loginNavOptions
  }
);

export default LoginNavStack;
