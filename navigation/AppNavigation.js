"use strict";

import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

import LoginNavStack from "./LoginNavStack";
import MainInsetNavStack from "./MainInsetNavStack";

const AppNavigation = StackNavigator({
  loginNavStack: { screen: LoginNavStack },
  mainInsetNavStack: { screen: MainInsetNavStack }
});

export default AppNavigation;
