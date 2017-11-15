"use strict";

import React, { Component } from "react";

import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import * as actions from "../../../../data/appActions";

import { NavigationActions } from "react-navigation";

import DrawerItem from "./DrawerItem";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/dimensions";
import commonColors from "../../../../constants/colors";
import TextFontTitillium from "../../../../components/TextFontTitillium";

class DrawerScreen extends Component {
  _handleNavToUserProfile = () => {
    this.props.navigation.navigate("userProfile");
    this.props.setInsetTabUI("userProfile");
  };

  _handleNavToMap = () => {
    this.props.navigation.navigate("map");
    this.props.setInsetTabUI("map");
  };

  _handleNavToStatistics = () => {
    this.props.navigation.navigate("statistics");
    this.props.setInsetTabUI("statistics");
    console.log("INSET TAB UI ", this.props.insetTabUI);
  };

  _handleNavToCauses = () => {
    this.props.navigation.navigate("causes");
    this.props.setInsetTabUI("causes");
  };

  _handleLogout = () => {
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
          <ImageBackground
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
          </ImageBackground>
        </View>
        <View style={styles.innerBottomContainer}>
          <DrawerItem
            {...this.props}
            onPress={() => navigation.navigate("userRegistration")}
            text="~  User Registration  ~"
            tabName="userRegistration"
          />
          <DrawerItem
            {...this.props}
            onPress={this._handleNavToUserProfile}
            text="~  User Profile  ~"
            tabName="userProfile"
            itemPosition="even"
          />
          <DrawerItem
            {...this.props}
            onPress={this._handleNavToMap}
            text="~  Map  ~"
            tabName="map"
          />
          <DrawerItem
            {...this.props}
            onPress={this._handleNavToStatistics}
            text="~  Statistics  ~"
            tabName="statistics"
            itemPosition="even"
          />
          <DrawerItem
            {...this.props}
            onPress={this._handleNavToCauses}
            text="~  Causes  ~"
            tabName="causes"
          />
          <DrawerItem
            {...this.props}
            onPress={this._handleLogout}
            text="~  Log Out  ~"
            tabName="logOut"
            itemPosition="even"
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
    margin: 5
  }
});

const mapStateToProps = state => ({
  insetTabUI: state.insetTabUI
});

const mapDispatchToProps = dispatch => ({
  setInsetTabUI: chosenTab => dispatch(actions.setInsetTabUI(chosenTab))
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerScreen);
