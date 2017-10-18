"use strict";

import React, { Component } from "react";
import { View } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class MenuIcon extends Component {
  _drawerToggle = () => {
    console.log("props are: ", this.props);
    this.props.navigation.navigate("DrawerToggle");
  };

  render() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingRight: 12
        }}
      >
        <Icon
          name="menu"
          size={40}
          color="white"
          onPress={this._drawerToggle}
        />
      </View>
    );
  }
}

export default MenuIcon;
