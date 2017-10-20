"use strict";

import React, { Component } from "react";

import { StyleSheet, View } from "react-native";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/dimensions";
import commonColors from "../constants/colors";

class MainInsetHeader extends Component {
  render() {
    return (
      <View style={style.mainContainer}>
        <Text>Hello!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: SCREEN_HEIGHT / 8,
    width: SCREEN_WIDTH,
    backgroundColor: commonColors.GREEN
  }
});

export default MainInsetHeader;
