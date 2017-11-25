"use strict";

import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

import WelcomeNavStack from "./WelcomeNavStack";
import MainInsetNavStack from "./MainInsetNavStack";

const AppNavigation = StackNavigator({
  welcomeNavStack: { screen: WelcomeNavStack },
  mainInsetNavStack: { screen: MainInsetNavStack }
});

export default AppNavigation;
