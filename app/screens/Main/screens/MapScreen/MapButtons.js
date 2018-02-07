import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import commonColors from "../../../../constants/colors";

class MapButtons extends Component {
  //--------------------------------------------------
  // PRESS MODAL UI SEARCH
  //--------------------------------------------------

  _onPressUserLocationSearch = () => {
    this.props.modalCitySearch(true);
  };

  //--------------------------------------------------
  // PRESS SAVE TRAILS
  //--------------------------------------------------

  _onPressSaveTrailsToServer = () => {};

  //--------------------------------------------------
  // PRESS START NEW TRAIL
  //--------------------------------------------------

  _onPressStartNewTrail = () => {
    this.props.addTrailToTrails(this.props.trail);
    this.props.generateNewTrail();
  };

  render() {
    return (
      <View style={styles.topButtonContainer}>
        <TouchableOpacity
          style={styles.icon}
          onPress={this._onPressUserLocationSearch}
        >
          <Icon name="search-web" size={40} color={commonColors.GREEN} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={this._onPressSaveTrails}>
          <Icon name="content-save" size={40} color={commonColors.GREEN} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={this.props.onPressToggleFollowMode}
        >
          <Icon
            name="walk"
            size={40}
            color={
              this.props.mapUI.mapFollowMode
                ? commonColors.PINK
                : commonColors.GREEN
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={this._onPressStartNewTrail}
        >
          <Icon name="map-marker-plus" size={40} color={commonColors.GREEN} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={this.props.onPressToggleTracking}
        >
          <Icon
            name={
              this.props.mapUI.trackingStatus
                ? "pause-circle-outline"
                : "play-circle-outline"
            }
            size={40}
            color={commonColors.PINK}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topButtonContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    left: 5,
    height: 60,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  icon: {
    backgroundColor: "rgba(0,0,0,0)"
  }
});

export default MapButtons;
