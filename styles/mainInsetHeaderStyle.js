import React from "react";

import { View } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "./dimensions";
import commonColors from "./colors";

export const headerStyle = {
  height: SCREEN_HEIGHT / 8,
  width: SCREEN_WIDTH,
  backgroundColor: commonColors.GREEN
};
