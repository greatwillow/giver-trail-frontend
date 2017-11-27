"use strict";

import React from "react";
import { StackNavigator, TabNavigator } from "react-navigation";

import WalkthroughScreen from "../screens/Welcome/screens/WalkthroughScreen/WalkthroughScreen";
import SignInScreen from "../screens/Welcome/screens/SignInScreen/SignInScreen";
import SignupScreen from "../screens/Welcome/screens/SignupScreen/SignupScreen";
import SignInFailScreen from "../screens/Welcome/screens/SignInFailScreen/SignInFailScreen";
import RegistrationWalkthroughScreen from "../screens/Welcome/screens/UserRegistrationScreen/RegistrationWalkthroughScreen";

import MainInsetNavStack from "./MainInsetNavStack";

const loginNavOptions = {
  initialRouteName: "walkthrough",
  header: null,
};

const WelcomeNavStack = StackNavigator(
  {
    // walkthrough: { screen: WalkthroughScreen },
    // signIn: { screen: SignInScreen },
    // signup: { screen: SignupScreen },
    // signInFail: { screen: SignInFailScreen },
    // userRegistration: { screen: RegistrationWalkthroughScreen },
    mainInsetNavStack: { screen: MainInsetNavStack } 
  },
  {
    navigationOptions: loginNavOptions
  }
);

export default WelcomeNavStack;
