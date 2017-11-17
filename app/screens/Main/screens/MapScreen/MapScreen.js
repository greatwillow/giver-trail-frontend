"use strict";

import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import Expo from "expo";
import shortid from 'shortid'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import * as actions from "../../../../data/appActions";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/dimensions";
import mockGeoJsonData from "../../../../assets/pureData/mockGeoJsonData2";

import GoogleAutocompleteSearch from "./GoogleAutocompleteSearch";
import commonColors from "../../../../constants/colors"
import { logInAsync } from "expo/src/Google";


let requestedGeoJsonData = { elements: [{ geometry: [{ lat: 0, lon: 0 }] }] };

class MapScreen extends Component {


//--------------------------------------------------
//   FETCHING POLYLINES
//--------------------------------------------------


  _fetchPolylines = () => {
    const MIN_LONGITUDE = this.props.mapUI.mapRegion.longitude - this.props.mapUI.mapRegion.longitudeDelta;
    const MIN_LATITUDE = this.props.mapUI.mapRegion.latitude - this.props.mapUI.mapRegion.latitudeDelta;
    const MAX_LONGITUDE = this.props.mapUI.mapRegion.longitude + this.props.mapUI.mapRegion.longitudeDelta;
    const MAX_LATITUDE = this.props.mapUI.mapRegion.latitude + this.props.mapUI.mapRegion.latitudeDelta;

    const OVERPASS_URL = `http://overpass-api.de/api/interpreter?data=[out:json];way["highway"="path"](
      ${MIN_LATITUDE},${MIN_LONGITUDE},${MAX_LATITUDE},${MAX_LONGITUDE});out geom;`;

    //const SERVER_URL = `https://damp-tor-16286.herokuapp.com/sendTrails`;
    //const USER_TOKEN = this.props.user.userToken;

    fetch(OVERPASS_URL, {
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      method: "GET",
      //"x-auth": USER_TOKEN
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
        console.log("THE ERROR IS: ", error);
      });
  };

//--------------------------------------------------
// REGION UPDATE
//--------------------------------------------------

_onRegionChangeComplete = (region) => {
  async function asyncFunc(region) {
    await this.props.setMapRegion(region);
    if(this.props.mapUI.mapRegion.latitudeDelta <= 0.2 && this.props.mapUI.mapRegion.longitudeDelta <= 0.2) {    
      await this._fetchPolylines();
    }
    return;
  }
  asyncFunc = asyncFunc.bind(this)
  return asyncFunc(region)
}

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

_onPressUserLocationSearch = () => {

}

_onPressMapZoomIn = () => {
  this.props.setMapRegion({
    latitude: this.props.mapUI.mapRegion.latitude,
    longitude: this.props.mapUI.mapRegion.longitude,
    latitudeDelta: this.props.mapUI.mapRegion.latitudeDelta - 0.05,
    longitudeDelta: this.props.mapUI.mapRegion.longitudeDelta -0.05
  })
}

_onPressMapZoomOut = () => {
  this.props.setMapRegion({
    latitude: this.props.mapUI.mapRegion.latitude,
    longitude: this.props.mapUI.mapRegion.longitude,
    latitudeDelta: this.props.mapUI.mapRegion.latitudeDelta + 0.05,
    longitudeDelta: this.props.mapUI.mapRegion.longitudeDelta + 0.05
  })
}


  render() {

      let polylines = requestedGeoJsonData.elements.map(e => {
        return e.geometry.map(c => {
          return ({latitude: c.lat, longitude: c.lon})
        })
      })

    return (
      <View style={{ flex: 1 }}>
        <Expo.MapView
          ref = {(ref) => { this.mapRef = ref}}
          //onLayout = {this._initialLayout()}
          onLayout = {() => this.mapRef.fitToCoordinates([
                {
                  latitude: this.props.user.userCity.latitude + 0.1, 
                  longitude: this.props.user.userCity.longitude + 0.1
                },{
                  latitude: this.props.user.userCity.latitude - 0.1, 
                  longitude: this.props.user.userCity.longitude - 0.1
                }      
              ], { edgePadding: { top: 0, right: 0, bottom: 0, left: 0 }, animated: true })
            }
          style={styles.mapStyle}
          provider="google"
          region={{
            longitude: this.props.mapUI.mapRegion.longitude,
            latitude: this.props.mapUI.mapRegion.latitude,
            longitudeDelta: this.props.mapUI.mapRegion.longitudeDelta,
            latitudeDelta: this.props.mapUI.mapRegion.latitudeDelta
          }}
          onRegionChangeComplete={reg => this._onRegionChangeComplete(reg)}
        >
          
        {polylines.map(p => (
          <Expo.MapView.Polyline
          key={shortid.generate()}
         coordinates={p}
         strokeColor={commonColors.PINK}
         strokeWidth={1}
       />
        ))}

        {/* <GoogleAutocompleteSearch {...this.props}/> */}
        </Expo.MapView>

        <TouchableOpacity style={styles.searchIcon} onPress={this._onPressUserLocationSearch}>
          <Icon name="search-web" size={40} color={commonColors.PINK}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomInIcon} onPress={this._onPressMapZoomIn}>
          <Icon name="plus-circle" size={50} color={commonColors.DARK_GREY} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomOutIcon} onPress={this._onPressMapZoomOut}>
          <Icon name="minus-circle" size={50} color={commonColors.DARK_GREY} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.trackingIcon} onPress={this._onPressUserLocationSearch}>
          <Icon name="radar" size={50} color={commonColors.DARK_GREY} />
        </TouchableOpacity>
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
  },
  searchIcon: {
    backgroundColor: "rgba(0,0,0,0)",
    position: 'absolute',
    top: 20,
    right: 20
  },
  zoomInIcon: {
    backgroundColor: "rgba(0,0,0,0)",
    position: 'absolute',
    bottom: 80,
    right: 20
  },
  zoomOutIcon: {
    backgroundColor: "rgba(0,0,0,0)",
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  trackingIcon: {
    backgroundColor: "rgba(0,0,0,0)",
    position: 'absolute',
    bottom: 20,
    left: 20
  }
});


const mapStateToProps = (state) => ({
  user: state.user,
  mapUI: state.mapUI
})

const mapDispatchToProps = (dispatch) => ({
  setUserCity: (userCity) => dispatch(actions.setUserCity(userCity)),
  setMapRegion: (mapRegion) => dispatch(actions.setMapRegion(mapRegion))
})


export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);

