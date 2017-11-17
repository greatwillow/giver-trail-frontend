"use strict";

import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import Expo from "expo";
import shortid from 'shortid'

import * as actions from "../../../../data/appActions";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/dimensions";
import mockGeoJsonData from "../../../../assets/pureData/mockGeoJsonData2";

import GoogleAutocompleteSearch from "./GoogleAutocompleteSearch";
import GoogleGeocoding from "../../../../utils/GoogleGeocoding"
import { googleMapsGeocodingAPIKey } from "../../../../constants/apiKeys"
import commonColors from "../../../../constants/colors"
import { logInAsync } from "expo/src/Google";


let requestedGeoJsonData = { elements: [{ geometry: [{ lat: 0, lon: 0 }] }] };

class MapScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: this.props.user.userCity.latitude,
      longitude: this.props.user.userCity.longitude,
      latitudeDelta: 0.3,
      longitudeDelta: 0.3
    };
  }
  

//--------------------------------------------------
// GEOCODING
//--------------------------------------------------

  _geocodeCity = (data, details) => {

    GoogleGeocoding.setApiKey(googleMapsGeocodingAPIKey);
      GoogleGeocoding.getFromLocation(details.name).then(
        json => {
          const location = json.results[0].geometry.location;
          const formattedLocation = {
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }
          this._updateLocation(formattedLocation)
          return formattedLocation;
        },
        error => {
          console.log("GEOCODING ERROR ",error);
        }
      ); 
  }

//--------------------------------------------------
//   FETCHING POLYLINES
//--------------------------------------------------


  _fetchPolylines = () => {
    const MIN_LONGITUDE = this.state.longitude - this.state.longitudeDelta;
    const MIN_LATITUDE = this.state.latitude - this.state.latitudeDelta;
    const MAX_LONGITUDE = this.state.longitude + this.state.longitudeDelta;
    const MAX_LATITUDE = this.state.latitude + this.state.latitudeDelta;

    const OVERPASS_URL = `http://overpass-api.de/api/interpreter?data=[out:json];way["highway"="footway"](
      ${MIN_LATITUDE},${MIN_LONGITUDE},${MAX_LATITUDE},${MAX_LONGITUDE});out geom;`;

    const SERVER_URL = `https://damp-tor-16286.herokuapp.com/sendTrails`;
    const USER_TOKEN = this.props.user.userToken;

    fetch(OVERPASS_URL, {
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      method: "GET",
      "x-auth": USER_TOKEN
    })
      .then(res => {
        if (res.status == 200) {
          return res.json();
        } else {
          throw new Error("Server Error");
        }
      })
      .then(data => {
        requestedGeoJsonData = Object.assign({},data);
      })
      .catch(error => {
        console.error("THE ERROR IS: ", error);
      });
  };

//--------------------------------------------------
// Updateding Location
//--------------------------------------------------

  _updateLocation = location => {
    this.setState(
      function(state, props) {
        return {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: location.latitudeDelta,
          longitudeDelta: location.longitudeDelta,
        };
      },
      function() {
        if(this.state.latitudeDelta <= 0.3 && this.state.longitudeDelta <= 0.3) {
          return this._fetchPolylines();
        }
      }
    );
    return;
  };

//--------------------------------------------------
// GETTING REGION DELTAS
//--------------------------------------------------

// _regionFrom(lat, lon, distance) {
//   distance = distance/2
//   const circumference = 40075
//   const oneDegreeOfLatitudeInMeters = 111.32 * 1000
//   const angularDistance = distance/circumference

//   const latitudeDelta = distance / oneDegreeOfLatitudeInMeters
//   const longitudeDelta = Math.abs(Math.atan2(
//           Math.sin(angularDistance)*Math.cos(lat),
//           Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat)))

//   return result = {
//       latitude: lat,
//       longitude: lon,
//       latitudeDelta,
//       longitudeDelta,
//   }
// }

//--------------------------------------------------
// RENDER
//--------------------------------------------------

  render() {

      let polylines = requestedGeoJsonData.elements.map(e => {
        return e.geometry.map(c => {
          return ({latitude: c.lat, longitude: c.lon})
        })
      })

      console.log('====================================');
      console.log("POLYLINES ", polylines);
      console.log('====================================');

    return (
      <View style={{ flex: 1 }}>
      
     
        <Expo.MapView
          ref = {(ref) => { this.mapRef = ref}}
          //onLayout = {this._initialLayout()}
          onLayout = {() => this.mapRef.fitToCoordinates([{
            latitude: this.props.user.userCity.latitude + 0.1, 
            longitude: this.props.user.userCity.longitude + 0.1
          },{
            latitude: this.props.user.userCity.latitude - 0.1, 
            longitude: this.props.user.userCity.longitude - 0.1
          }
        
        ], { edgePadding: { top: 0, right: 0, bottom: 0, left: 0 }, animated: true })}
          style={styles.mapStyle}
          provider="google"
          region={{
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
          
        {polylines.map(p => (
          <Expo.MapView.Polyline
          key={shortid.generate()}
         coordinates={p}
         strokeColor={commonColors.PINK}
         strokeWidth={1}
       />
        ))}


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


const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  setUserCity: (userCity) => dispatch(actions.setUserCity(userCity))
})

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);

