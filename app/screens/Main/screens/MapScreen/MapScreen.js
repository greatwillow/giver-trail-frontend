"use strict";

import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Expo from "expo";

import Geojson from "../../../../components/GeoJson";
import GeojsonClass from "../../../../components/GeoJsonClass";

import { SCREEN_WIDTH } from "../../../../constants/dimensions";
import mockGeoJsonData from "../../../../assets/pureData/mockGeoJsonData";

let requestedGeoJsonData = mockGeoJsonData;
class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 46.0108,
      longitude: -74.1812,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0921
    };
  }

  _testPress = () => {
    const MIN_LONGITUDE = this.state.longitude - this.state.longitudeDelta / 2;
    const MIN_LATITUDE = this.state.latitude - this.state.latitudeDelta / 2;
    const MAX_LONGITUDE = MIN_LONGITUDE + this.state.longitudeDelta / 2;
    const MAX_LATITUDE = MIN_LATITUDE + this.state.latitudeDelta / 2;

    const FETCH_URL = `http://overpass-api.de/api/interpreter?data=[out:json];way["highway"="footway"](50.745,7.17,50.75,7.18);out geom;`;

    const SERVER_URL = `https://damp-tor-16286.herokuapp.com/getPoint`;

    const MOCK_URL = `http://overpass-api.de/api/interpreter?data=[out:json];way["highway"="footway"](
       ${MIN_LATITUDE},${MIN_LONGITUDE},${MAX_LATITUDE},${MAX_LONGITUDE});out geom;`;

    console.log("INSIDE FETCH ", FETCH_URL);
    console.log("INSIDE MOCK ", MOCK_URL);
    fetch(MOCK_URL, {
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      method: "GET"
    })
      .then(res => {
        if (res.status == 200) {
          console.log("GOOD RESPONSE! ", res);
          return res.json();
        } else {
          console.log("There's an Error ", res.error);
          throw new Error("Server Error");
        }
      })
      .then(data => {
        console.log("GOT THE DATA! ", data);
        requestedGeoJsonData = Object.assign({}, data);
      })
      .catch(error => {
        console.error("THE ERROR IS: ", error);
      });
  };

  _updateLocation = location => {
    con;

    console.log("REGION IS: ", location);
    this.setState(
      function(state, props) {
        return {
          latitude: location.latitude,
          longitude: location.longitude
        };
      },
      function() {
        console.log(
          "WHAT IS THE REGION STATE?",
          this.state.latitude,
          this.state.longitude
        );
        return this._testPress();
      }
    );
    return;
  };

  //------------------------------------------TOP GEOJSON STUFF------------------------

  makeOverlays = elements => {
    const points = elements
      .filter(e => e && e.type === "node")
      .map(element =>
        this.makeCoordinates(element).map(geometry =>
          this.makeOverlay(geometry, element)
        )
      )
      .reduce(this.flatten, [])
      .map(overlay => {
        console.log("POINTS OVERLAY: ", overlay);
        return { ...overlay, type: "point" };
      });

    const lines = elements
      .filter(e => e.geometry && e.type === "way")
      .map(element =>
        this.makeCoordinates(element).map(geometry => {
          console.log("LINES OVERLAY: ", geometry);
          return this.makeOverlay(geometry, element);
        })
      )
      .reduce(this.flatten, [])
      .map(overlay => {
        console.log("NEW CL ", overlay);
        return { ...overlay, type: "polyline" };
      });

    const polygons = elements
      .filter(e => e.geometry && e.type === "Polygon")
      .map(element => this.makeOverlay(this.makeCoordinates(element), element))
      .reduce(this.flatten, [])
      .map(overlay => ({ ...overlay, type: "polygon" }));

    console.log("LINES ", lines);
    console.log("POINTS ", points);
    const overlays = points.concat(lines).concat(polygons);
    console.log("FINAL BEFORE EXIT: ", overlays);
    return overlays;
  };

  flatten = (prev, curr) => prev.concat(curr);

  makeOverlay = (geometry, element) => {
    let overlay = {
      element,
      id: element.id ? element.id : uuid()
    };
    if (element.type === "Polygon") {
      overlay.geometry = geometry[0];
      if (geometry.length > 1) {
        overlay.holes = geometry.slice(1);
      }
    } else {
      overlay.geometry = geometry;
    }

    return overlay;
  };

  makenode = c => ({ latitude: c.lat, longitude: c.lon });

  makeLine = l => l.map(this.makenode);

  makeCoordinates = element => {
    const e = element;
    if (e.type === "node") {
      if (e.hasOwnProperty("geometry")) {
        return [this.makenode(e.geometry)];
      }
      return []; //return [makenode(e)];
    } else if (e.type === "way") {
      return [this.makeLine(e.geometry)];
    } else if (e.type === "Polygon") {
      return e.geometry.map(this.makeLine);
    } else {
      return [];
    }
  };

  //------------------------------BOTTOM GEOJSON STUFF---------------------------------------

  render() {
    //-----------------------Top GeoJson----------
    const overlays = this.makeOverlays(requestedGeoJsonData.elements);
    // console.log("OVERLAYS ARE: ", overlays);
    //-----------------------Bottom GeoJson----------
    return (
      <View style={{ flex: 1 }}>
        <Expo.MapView
          style={styles.mapStyle}
          provider="google"
          initialRegion={{
            longitude: this.state.longitude,
            latitude: this.state.latitude,
            longitudeDelta: this.state.longitudeDelta,
            latitudeDelta: this.state.latitudeDelta
          }}
          onRegionChangeComplete={reg => this._updateLocation(reg)}
        >
          {/*<GeojsonClass geojson={requestedGeoJsonData} />*/}
          <Expo.MapView.Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
          />
          <Expo.MapView.Marker
            coordinate={{
              latitude:
                this.state.latitude - this.state.latitudeDelta / 2 + 0.01,
              longitude:
                this.state.longitude - this.state.longitudeDelta / 2 + 0.01
            }}
          />
          <View>
            {overlays.map(overlay => {
              if (overlay.type === "point") {
                return (
                  <Expo.MapView.Marker
                    key={overlay.id}
                    coordinate={overlay.geometry}
                    pinColor={this.props.color}
                  />
                );
              }
              if (overlay.type === "way") {
                return (
                  <Expo.MapView.Polygon
                    key={overlay.id}
                    coordinates={overlay.geometry}
                    holes={overlay.holes}
                    strokeColor={this.props.strokeColor}
                    fillColor={this.props.fillColor}
                    strokeWidth={this.props.strokeWidth}
                  />
                );
              }
              if (overlay.type === "way") {
                console.log("INSIDE MAPVIEW! ", overlay);
                return (
                  <Expo.MapView.Polyline
                    key={overlay.id}
                    coordinates={overlay.geometry}
                    strokeColor={this.props.strokeColor}
                    strokeWidth={2}
                  />
                );
              }
            })}
          </View>
        </Expo.MapView>

        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ width: 100, height: 50 }}
            //onPress={() => this._updateLocation()}
          >
            <Text> Press Me</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapStyle: {
    flex: 3,
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

// {
//   id: "1234",
//   type: "line",
//   centralCoordinate: {
//     latitude: 45.7377,
//     longitude: 76.8888
//   }
//   coordinates: [
//     {
//       latitude: 46.1564,
//       longitude: -76.2343
//     }
//   ]
// }
