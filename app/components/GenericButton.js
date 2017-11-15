"use strict";

import React, { Component } from "react";
import { Text, StyleSheet, TouchableHighlight, View } from "react-native";

import { SCREEN_WIDTH } from "../constants/dimensions";
import TextFontTitillium from "./TextFontTitillium"

class GenericButton extends Component {


  render() {
    return (
      <TouchableHighlight
        style={[styles.button, this.props.style]}
        underlayColor={"gray"}
        onPress={this.props.onPress}
      >
      <View>
        <TextFontTitillium >
          {this.props.text ? this.props.text : "Text Needed!"}{" "}
        </TextFontTitillium>
        </View>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  button: {
    width: SCREEN_WIDTH / 6 * 5,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
    padding: 5
  },
  buttonText: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    fontSize: 20,
    color: "black"
  }
});

export default GenericButton;
