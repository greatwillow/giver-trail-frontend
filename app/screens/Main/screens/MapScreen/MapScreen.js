"use strict";

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Expo from "expo";

import Geojson from "../../../../components/GeoJson";

import { SCREEN_WIDTH } from "../../../../constants/dimensions";
import mockGeoJsonData from "../../../../assets/pureData/mockGeoJsonData";

class MapScreen extends Component {
  render() {
    return (
      <Expo.MapView  
        style={styles.layoutStyle}
        initialRegion={{
          latitude: 46.0108,
          longitude: -74.1812, 
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <Geojson geojson={mockGeoJsonData} />
      </Expo.MapView>
    );
  }
}

const styles = StyleSheet.create({
  layoutStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
    height: 400
  },
  textStyle: {
    fontSize: 30,
    color: "red"
  }
});

export default MapScreen;
