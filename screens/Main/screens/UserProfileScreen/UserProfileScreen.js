"use strict";

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SCREEN_WIDTH } from "../../../../styles/dimensions";
//import Icon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import TestButton from "../../../../components/TestButton";
import DrawerScreen from "../DrawerScreen/DrawerScreen";

class UserProfileScreen extends Component {
  render() {
    return (
      <View style={styles.layoutStyle}>
        <Text style={styles.textStyle}>User Profile!</Text>
        <TestButton
          onPress={() => {
            this.props.navigation.navigate("DrawerToggle");
          }}
          textInput={"open drawer"}
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
