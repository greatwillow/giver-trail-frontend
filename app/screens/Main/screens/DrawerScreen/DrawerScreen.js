"use strict";

import React, { Component } from "react";

import { Image, StyleSheet, Text, View } from "react-native";

import { NavigationActions } from "react-navigation";

import DrawerItem from "./DrawerItem";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/dimensions";
import commonColors from "../../../../constants/colors";
import TextFontTitillium from "../../../../components/TextFontTitillium";

export default class DrawerScreen extends Component {
  logout = () => {
    const logoutNavAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: "loginNavStack" })]
    });
    this.props.navigation.dispatch(logoutNavAction);
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.innerTopContainer}>
          <Image
            source={require("../../../../assets/images/red-sky.jpeg")}
            style={{
              width: SCREEN_WIDTH / 16 * 13,
              height: SCREEN_WIDTH / 2,
              justifyContent: "center"
            }}
            resizeMode="cover"
          >
            <TextFontTitillium style={styles.title}>
              ~ GiverTrail ~
            </TextFontTitillium>
          </Image>
        </View>
        <View style={styles.innerBottomContainer}>
          <DrawerItem
            onPress={() => navigation.navigate("userRegistration")}
            text="~  User Registration  ~"
          />
          <DrawerItem
            onPress={() => navigation.navigate("userProfile")}
            text="~  User Profile  ~"
            itemPosition="even"
          />
          <DrawerItem
            onPress={() => navigation.navigate("map")}
            text="~  Map  ~"
          />
          <DrawerItem
            onPress={() => navigation.navigate("statistics")}
            text="~  Statistics  ~"
            itemPosition="even"
          />
          <DrawerItem
            onPress={this.logout}
            style={styles.drawerItem}
            text="~  Log Out  ~"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: commonColors.DARK_GREY
  },
  innerTopContainer: {
    flex: 8
  },
  innerBottomContainer: {
    flex: 14
  },
  title: {
    fontSize: SCREEN_WIDTH / 12,
    backgroundColor: "rgba(0,0,0,0)",
    color: commonColors.PINK,
    textAlign: "center",
    //padding: 15,
    margin: 5
  }
});
