"use strict";

import React, { Component } from "react";

import { StyleSheet, TouchableOpacity, View } from "react-native";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/dimensions";
import commonColors from "../constants/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class CustomTabItem extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.tabContainer}
        onPress={this.props.onPress}
      >
        <Icon
          name={this.props.iconName}
          size={40}
          color={
            this.props.insetTabUI.insetTabChosen === this.props.tabName
              ? commonColors.PINK
              : commonColors.GREEN
          }
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    width: SCREEN_WIDTH / 4,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default CustomTabItem;
