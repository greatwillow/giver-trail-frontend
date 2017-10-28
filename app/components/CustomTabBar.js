"use strict";

import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from "react-native";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/dimensions";
import commonColors from "../constants/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class CustomTabBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: "userProfile"
    };
  }

  _selectUserProfileTab = () => {
    this.props.navigation.navigate("userProfile");
    this.setState({
      selectedTab: "userProfile"
    });
  };

  _selectMapTab = () => {
    this.props.navigation.navigate("map");
    this.setState({
      selectedTab: "map"
    });
  };

  _selectStatisticsTab = () => {
    this.props.navigation.navigate("statistics");
    this.setState({
      selectedTab: "statistics"
    });
  };

  _selectCausesTab = () => {
    this.props.navigation.navigate("causes");
    this.setState({
      selectedTab: "causes"
    });
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity
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
        </TouchableOpacity>
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

export default CustomTabBar;
