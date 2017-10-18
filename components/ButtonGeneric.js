"use strict";

import React, { Component } from "react";
import { Text, StyleSheet, TouchableHighlight } from "react-native";

import { SCREEN_WIDTH } from "../styles/dimensions";

class ButtonGeneric extends Component {
  render() {
    return (
      <TouchableHighlight
        style={[styles.button, this.props.style]}
        underlayColor={"gray"}
        onPress={this.props.onPress}
      >
        <Text style={styles.buttonText}>
          {this.props.text ? this.props.text : "Text Needed!"}{" "}
        </Text>
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

export default ButtonGeneric;
