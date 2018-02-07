import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import commonColors from "../../../../constants/colors";

class MapButtonsZoom extends Component {
  //--------------------------------------------------
  // PRESS ZOOM
  //--------------------------------------------------

  _onPressMapZoomIn = () => {
    this.props.setMapZoom(this.props.mapUI.mapZoom + 1);
  };

  _onPressMapZoomOut = () => {
    this.props.setMapZoom(this.props.mapUI.mapZoom - 1);
  };

  render() {
    return (
      <View style={styles.zoomButtonContainer}>
        <TouchableOpacity style={styles.icon} onPress={this._onPressMapZoomIn}>
          <Icon name="plus-circle" size={40} color={"rgba(0,0,0,0.2)"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={this._onPressMapZoomOut}>
          <Icon name="minus-circle" size={40} color={"rgba(0,0,0,0.2)"} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  zoomButtonContainer: {
    position: "absolute",
    bottom: 15,
    left: 15,
    backgroundColor: "transparent",
    borderRadius: 5,
    padding: 10
  },
  icon: {
    backgroundColor: "rgba(0,0,0,0)"
  }
});

export default MapButtonsZoom;
