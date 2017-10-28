"use strict";

import React, { Component } from "react";

import { StyleSheet, TouchableOpacity, View } from "react-native";

import TextFontTitillium from "../../../../components/TextFontTitillium";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/dimensions";
import commonColors from "../../../../constants/colors";

class DrawerItem extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[
          styles.container,
          this.props.style,
          {
            backgroundColor:
              this.props.itemPosition === "even"
                ? commonColors.LIGHT_GREY
                : commonColors.GREEN
          }
        ]}
      >
        <TextFontTitillium style={[styles.text, this.props.textStyle]}>
          {this.props.text}
        </TextFontTitillium>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    opacity: 0.7
  },
  text: {
    fontSize: 20,
    backgroundColor: "rgba(0,0,0,0)",
    textAlign: "center"
  }
});

export default DrawerItem;
