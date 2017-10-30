"use strict";

import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../data/appActions";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/dimensions";
import commonColors from "../constants/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomTabItem from "./CustomTabItem";

class CustomTabBar extends Component {
  _selectUserProfileTab = () => {
    this.props.navigation.navigate("userProfile");
    this.props.setInsetTabUI("userProfile");
  };

  _selectMapTab = () => {
    this.props.navigation.navigate("map");
    this.props.setInsetTabUI("map");
  };

  _selectStatisticsTab = () => {
    this.props.navigation.navigate("statistics");
    this.props.setInsetTabUI("statistics");
  };

  _selectCausesTab = () => {
    this.props.navigation.navigate("causes");
    this.props.setInsetTabUI("causes");
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <CustomTabItem
          {...this.props}
          onPress={this._selectUserProfileTab}
          iconName="account-box-outline"
          tabName="userProfile"
        />
        <CustomTabItem
          {...this.props}
          onPress={this._selectMapTab}
          iconName="map-marker-radius"
          tabName="map"
        />
        <CustomTabItem
          {...this.props}
          onPress={this._selectStatisticsTab}
          iconName="chart-bar"
          tabName="statistics"
        />
        <CustomTabItem
          {...this.props}
          onPress={this._selectCausesTab}
          iconName="gift"
          tabName="causes"
        />
        {/*<TouchableOpacity
          style={styles.tabContainer}
          onPress={this._selectUserProfileTab}
        >
          <Icon
            name="account-box-outline"
            size={40}
            color={
              this.state.selectedTab === "userProfile"
                ? commonColors.PINK
                : commonColors.GREEN
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabContainer}
          onPress={this._selectMapTab}
        >
          <Icon
            name="map-marker-radius"
            size={40}
            color={
              this.state.selectedTab === "map"
                ? commonColors.PINK
                : commonColors.GREEN
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabContainer}
          onPress={this._selectStatisticsTab}
        >
          <Icon
            name="chart-bar"
            size={40}
            color={
              this.state.selectedTab === "statistics"
                ? commonColors.PINK
                : commonColors.GREEN
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabContainer}
          onPress={this._selectCausesTab}
        >
          <Icon
            name="gift"
            size={40}
            color={
              this.state.selectedTab === "causes"
                ? commonColors.PINK
                : commonColors.GREEN
            }
          />
        </TouchableOpacity>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: commonColors.DARK_GREY,
    flexDirection: "row",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 8 * 1.2
  },
  tabContainer: {
    width: SCREEN_WIDTH / 4,
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => ({
  insetTabUI: state.insetTabUI
});

const mapDispatchToProps = dispatch => ({
  setInsetTabUI: chosenTab => dispatch(actions.setInsetTabUI(chosenTab))
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomTabBar);
