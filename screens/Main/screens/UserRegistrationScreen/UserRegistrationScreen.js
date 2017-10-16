"use strict";

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import { SCREEN_WIDTH } from "../../../../styles/dimensions";

import TestButton from "../../../../components/TestButton";

class UserRegistrationScreen extends Component {
  render() {
    return (
      <View style={styles.layoutStyle}>
        <TestButton
          onPress={() => {
            this.props.navigation.navigate("drawer");
          }}
          text={"Drawer Page"}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layoutStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH
  },
  textStyle: {
    fontSize: 30,
    color: "red"
  }
});

export default UserRegistrationScreen;
