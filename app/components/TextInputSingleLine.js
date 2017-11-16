"use strict";

import React, { Component } from "react";

import { StyleSheet, Text, TextInput, View } from "react-native";

import { SCREEN_WIDTH } from "../constants/dimensions";

class TextInputSingleLine extends Component {
  render() {
    return (
      <View>
        {this.props.invalid ? (
          <View style={styles.invalidTextContainer}>
            <Text style={styles.invalidText}>{this.props.invalidText}</Text>
          </View>
        ) : null}
        <TextInput
          style={[
            styles.textInputSingleLine,
            this.props.style,
            this.props.invalid ? { borderColor: "red", borderWidth: 1 } : null
          ]}
          placeholder={this.props.placeholder}
          placeholderTextColor={
            this.props.invalid ? "red" : this.props.placeholderTextColor
          }
          keyboardType={this.props.keyboardType}
          underlineColorAndroid={'rgba(0,0,0,0)'}
          returnKeyType={this.props.returnKeyType || "next"}
          secureTextEntry={this.props.secureTextEntry}
          autoCapitalize="words"
          autoCorrect={false}
          returnKeyType="next"
          clearButtonMode="while-editing"
          autoFocus={this.props.autoFocus || false}
          maxLength={50}
          defaultValue={this.props.defaultValue}
          onSubmitEditing={this.props.onSubmitEditing}
          onChangeText={this.props.onChangeText}
          onEndEditing={this.props.onEndEditing}
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
    marginBottom: 5,
    marginTop: 5,
    padding: 5,
    paddingLeft: 10,
    borderRadius: 5,
    height: 40,
    width: SCREEN_WIDTH / 6 * 5,
    alignSelf: "center"
  },
  invalidTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH / 6 * 5,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 10,
    margin: 10
  },
  invalidText: {
    fontSize: 15,
    color: "red"
  }
});

export default TextInputSingleLine;
