"use strict";

import React, { Component } from "react";

import { StyleSheet, Text, View } from "react-native";

//import { Font } from "expo";

class TextFontTitillium extends Component {
  render() {
    return (
      <View>
        <Text
          style={[{ fontFamily: "TitilliumWeb-Regular" }, this.props.style]}
        >
          {this.props.children}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default TextFontTitillium;
