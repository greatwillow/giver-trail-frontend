"use strict";

import React, { Component } from "react";
import { Text, StyleSheet, TouchableHighlight } from "react-native";

import { SCREEN_WIDTH } from "../constants/dimensions";
import { Font } from "expo";

class GenericButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      "titillium-light": require("../assets/fonts/TitilliumWeb-Light.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <TouchableHighlight
        style={[styles.button, this.props.style]}
        underlayColor={"gray"}
        onPress={this.props.onPress}
      >
        <Text
          style={[
            { fontFamily: this.state.fontLoaded ? "titillium-light" : null },
            styles.buttonText,
            this.props.textStyle
          ]}
        >
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
