"use strict";

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SCREEN_WIDTH } from "../../../../styles/dimensions";

import ButtonGeneric from "../../../../components/ButtonGeneric";
import DrawerScreen from "../DrawerScreen/DrawerScreen";

class UserProfileScreen extends Component {
  _onPressDrawerToggle = () => {
    this.props.navigation.navigate("DrawerToggle");
  };

  render() {
    return (
      <View style={styles.layoutStyle}>
        <Text style={styles.textStyle}>User Profile!</Text>
        <ButtonGeneric
          onPress={this._onPressDrawerToggle}
          text={"open drawer"}
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

export default UserProfileScreen;
