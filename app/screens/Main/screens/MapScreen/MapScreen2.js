"use strict";

import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Expo from "expo";

import Geojson from "../../../../components/GeoJson";
import GeojsonClass from "../../../../components/GeoJsonClass";

import { SCREEN_WIDTH } from "../../../../constants/dimensions";
import mockGeoJsonData from "../../../../assets/pureData/mockGeoJsonData2";

let count = 0;
let requestedGeoJsonData = {
  id: 456,
  elements: [{ geometry: [{ latitude: 12, longitude: 75 }] }]
}; //mockGeoJsonData;
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

    const SERVER_URL = `https://damp-tor-16286.herokuapp.com/getPoint`;

    const OVERPASS_URL = `http://overpass-api.de/api/interpreter?data=[out:json];way["highway"="footway"](
      ${MIN_LATITUDE},${MIN_LONGITUDE},${MAX_LATITUDE},${MAX_LONGITUDE});out geom;`;

    fetch(OVERPASS_URL, {
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

  render() {
    let inputtedData = requestedGeoJsonData; //mockGeoJsonData.elements[count];
    count += 1;
    console.log("COUNT IS, ", count, "And inputted Data is ", inputtedData);

    let newData = inputtedData.elements.reduce((a, b) => {
      a.geometry.concat(b.geometry);
    });
    console.log("NEW DATA IS ", newData);

    // let newData = inputtedData.elements.map(element => {
    //   return element.geometry;
    // });
    // console.log("NEW DATA IS ", newData);
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
          <Expo.MapView.Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
          />
          {/* <Expo.MapView.Polyline
            key={inputtedData.id}
            coordinates={newData}
            strokeColor={"red"}
            strokeWidth={2}
          /> */}
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
// // }
//           {inputtedData.elements.map(element => {
//             <Expo.MapView.Polyline
//             key={inputtedData.id}
//             coordinates={element.geometry}
//             strokeColor={"red"}
//             strokeWidth={2}
//           />;
//         })}

{
  /* <Expo.MapView.Polyline
key={inputtedData.id}
coordinates={inputtedData.geometry}
strokeColor={"red"}
strokeWidth={2}
/> */
}
