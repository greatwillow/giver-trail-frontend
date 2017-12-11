import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import commonColors from "../../../../constants/colors";

import {
  calculateTrailLength,
  //euclideanDistance
} from "./GeolocationUtils";

class MapButtons extends Component {

  //--------------------------------------------------
  // PRESS MODAL UI SEARCH
  //--------------------------------------------------

  _onPressUserLocationSearch = () => {
    this.props.modalCitySearch(true);
  };

  //--------------------------------------------------
  // PRESS ZOOM
  //--------------------------------------------------

  _onPressMapZoomIn = () => {
    this.props.setMapZoom(this.props.mapUI.mapZoom + 1);
  };

  _onPressMapZoomOut = () => {
    this.props.setMapZoom(this.props.mapUI.mapZoom - 1);
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

  //--------------------------------------------------
  // CALCULATE TRAIL LENGTH
  //--------------------------------------------------

  _onPressCalculateTrailLength = () => {
    const trailLength = calculateTrailLength(this.props.trails.trails)
    console.log('====================================');
    console.log("TRAAAAAILS ", trailLength);
    console.log('====================================');
  }

  render() {
    return (

        <View style={styles.topButtonContainer}>
          <TouchableOpacity
            style={styles.icon}
            onPress={this._onPressUserLocationSearch}
          >
            <Icon name="search-web" size={40} color={commonColors.GREEN} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={this._onPressSaveTrails}
          >
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
                this.props.trail.trackingStatus
                  ? "pause-circle-outline"
                  : "play-circle-outline"
              }
              size={40}
              color={commonColors.PINK}
            />
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.icon}
          onPress={this._onPressMapZoomOut}
        >
          <Icon name="minus-circle" size={40} color={commonColors.GREEN} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={this._onPressMapZoomIn}
        >
          <Icon name="plus-circle" size={40} color={commonColors.GREEN} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={this._onPressCalculateTrailLength}
        >
          <Icon name="walk" size={40} color={commonColors.GREEN} />
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
    padding: 10
  },
  icon: {
    backgroundColor: "rgba(0,0,0,0)"
  },
  zoomInIcon: {
    backgroundColor: "rgba(0,0,0,0)",
    position: "absolute",
    left: 10,
    bottom: 70
  },
  zoomOutIcon: {
    backgroundColor: "rgba(0,0,0,0)",
    position: "absolute",
    left: 10,
    bottom: 10
  },
  trackingIcon: {
    backgroundColor: "rgba(0,0,0,0)",
    marginHorizontal: 10
  }
});

export default MapButtons;





      // <View
      //   style={{ position: "absolute", top: 0, bottom: 0, right: 0, left: 0 }}
      // >

        // <TouchableOpacity
        //   style={styles.zoomOutIcon}
        //   onPress={this._onPressMapZoomOut}
        // >
        //   <Icon name="minus-circle" size={50} color={commonColors.DARK_GREY} />
        // </TouchableOpacity>
        // <TouchableOpacity
        //   style={styles.zoomInIcon}
        //   onPress={this._onPressMapZoomIn}
        // >
        //   <Icon name="plus-circle" size={50} color={commonColors.DARK_GREY} />
        // </TouchableOpacity>
      // </View>