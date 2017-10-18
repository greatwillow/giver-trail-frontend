"use strict";

import React, { Component } from "react";

import { StyleSheet, TextInput, View } from "react-native";

import { SCREEN_WIDTH } from "../styles/dimensions";

class TextInputSingleLine extends Component {
  render() {
    return (
      <View>
        <TextInput
          style={[styles.textInputSingleLine, this.props.style]}
          placeholder={this.props.placeholder}
          placeholderTextColor={this.props.placeholderTextColor}
          keyboardType={this.props.keyboardType}
          returnKeyType={this.props.returnKeyType || "next"}
          secureTextEntry={this.props.secureTextEntry}
          autoCapitalize="words"
          autoCorrect={false}
          returnKeyType="next"
          clearButtonMode="while-editing"
          autoFocus={this.props.autoFocus || false}
          maxLength={15}
          defaultValue={this.props.defaultValue}
        />
      </View>
    );
  }
}

{
  /*smartScrollOptions={{
  moveToNext: true,
  type: "text"
}}*/
}
{
  /*onChangeText={input => {
  this.setState({
    text: input
  });
}}*/
}
const styles = StyleSheet.create({
  textInputSingleLine: {
    backgroundColor: "white",
    marginBottom: 25,
    padding: 5,
    paddingLeft: 10,
    borderRadius: 5,
    height: 40,
    width: SCREEN_WIDTH / 6 * 5,
    alignSelf: "center"
  }
});

export default TextInputSingleLine;
