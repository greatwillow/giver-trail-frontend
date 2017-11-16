"use strict";

import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import Expo from "expo";
import shortid from 'shortid'

import * as actions from "../../../../data/appActions";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/dimensions";
import mockGeoJsonData from "../../../../assets/pureData/mockGeoJsonData2";
import GooglePlacesAutocomplete from "../../../../utils/GooglePlacesAutocomplete";
import { googlePlacesAutocompleteAPIKey } from "../../../../constants/apiKeys";
import GoogleGeocoding from "../../../../utils/GoogleGeocoding"
import { googleMapsGeocodingAPIKey } from "../../../../constants/apiKeys"
import commonColors from "../../../../constants/colors"
import { logInAsync } from "expo/src/Google";


let requestedGeoJsonData = { elements: [{ geometry: [{ lat: 0, lon: 0 }] }] };
class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 46.0108,
      longitude: -74.1812,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0321
    };
  }

//--------------------------------------------------
// INITIAL MAP LAYOUT
//--------------------------------------------------
  
  _initialLayout = () => {
    this.mapRef.fitToCoordinates([{
      latitude: this.props.user.userCity.latitude, 
      longitude: this.props.user.userCity.longitude
    }], { 
      edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, 
      animated: false 
    })
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
    const MIN_LONGITUDE = this.state.longitude - this.state.longitudeDelta / 2;
    const MIN_LATITUDE = this.state.latitude - this.state.latitudeDelta / 2;
    const MAX_LONGITUDE = this.state.longitude + this.state.longitudeDelta / 2;
    const MAX_LATITUDE = this.state.latitude + this.state.latitudeDelta / 2;

    const OVERPASS_URL = `http://overpass-api.de/api/interpreter?data=[out:json];way["highway"="footway"](
      ${MIN_LATITUDE},${MIN_LONGITUDE},${MAX_LATITUDE},${MAX_LONGITUDE});out geom;`;

    const SERVER_URL = `https://damp-tor-16286.herokuapp.com/sendTrails`;
    const USER_TOKEN = this.props.user.userToken;

    fetch(SERVER_URL, {
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

        console.log('====================================');
        console.log("SERVER DATA ",data);
        console.log('====================================');

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
          longitude: location.longitude
        };
      },
      function() {


        return this._fetchPolylines();
      }
    );
    return;
  };

  render() {

      let polylines = requestedGeoJsonData.map(e => {
        return e.Trail.geometry.coordinates.map(c => {
          return ({latitude: c.lat, longitude: c.lng})
        })
      })

    return (
      <View style={{ flex: 1 }}>
      
      <GooglePlacesAutocomplete
              placeholder="Search for your City!"
              minLength={2}
              listViewDisplayed="auto"
              fetchDetails={true}
              renderDescription={row => row.description}
              onPress={(data, details = null) => {
                this._geocodeCity(data, details);
              }}
              getDefaultValue={() => ""}
              query={{
                key: googlePlacesAutocompleteAPIKey,
                language: "en",
                types: "(cities)"
              }}
              nearbyPlacesAPI="GooglePlacesSearch"
              GooglePlacesSearchQuery={{
                rankby: "distance"
              }}
              filterReverseGeocodingByTypes={[
                "locality",
                "administrative_area_level_3"
              ]}
              debounce={200}
              styles={{
                textInputContainer: {
                  width: "100%",
                  backgroundColor: "white"
                },
                textInput: {
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 10,
                  height: 40
                },
                listView: {
                  height: SCREEN_HEIGHT / 9
                }
              }}
            />      
        <Expo.MapView
          ref = {(ref) => {this.mapRef = ref}}
          onLayout = {this._initialLayout}
          style={styles.mapStyle}
          //provider="google"
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
          
        {/* {polylines.map(p => (
          <Expo.MapView.Polyline
          key={shortid.generate()}
         coordinates={p}
         strokeColor={commonColors.PINK}
         strokeWidth={1}
       />
        ))} */}


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

