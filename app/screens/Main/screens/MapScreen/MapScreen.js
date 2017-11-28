import React, { Component } from "react";
import {
  Alert,
  Geolocation,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../../../../data/appActions";
import shortid from "shortid";
import BackgroundTimer from "react-native-background-timer";

//import BackgroundGeolocation from "react-native-mauron85-background-geolocation";
import MapboxGL from "@mapbox/react-native-mapbox-gl";
//TODO: Get rid of RN Permisions Library?
//import Permissions from "react-native-permissions";
import GoogleAutocompleteSearch from "./GoogleAutocompleteSearch";
import { lineString as makeLineString } from "@turf/helpers";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/dimensions";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import commonColors from "../../../../constants/colors";
import ModalCitySearch from "./ModalCitySearch";
//import { modalCitySearch } from "../../../../data/appActions";
//import exampleIcon from '../../../../assets/exampleIcon.png';

import {
  requestGeolocationPermission,
  configureGeolocation,
  checkIfAppInBackground,
  onGeolocationAuthorize,
  onGeolocationError,
  //TODO: Can get this into utils?
  //onGeolocationPing,
  onGeolocationStart,
  onGeolocationStop,
  onGeolocationStationary
} from "./GeolocationUtils";

MapboxGL.setAccessToken(
  "pk.eyJ1IjoiZ3JlYXR3aWxsb3ciLCJhIjoiY2phNGJkNW05YTg1ajJ3czR2MjRkamN4ZyJ9.4QQ9UW5OoFMq6A5LbCgMXA"
);

let backgroundEvent;
class MapScreen extends Component {
  constructor() {
    super();
    this.state = {
      //TODO: change this to undetermined, and then get to work on android
      locationPermission: "authorized",
      route: {}
    };
  }

  //--------------------------------------------------
  // MOUNTING
  //--------------------------------------------------

  componentDidMount() {
    // Permissions.request("location").then(response => {
    //   alert('Permission is ',response)
    //   console.log("PERMISSION IS ", response)
    //   this.setState({
    //     locationPermission: response
    //   });
    // });

    requestGeolocationPermission();
    // configureGeolocation();
    // checkIfAppInBackground();
    // onGeolocationAuthorize();
    // //onGeolocationError();
    // //this.onGeolocationPing();
    // onGeolocationStart();
    // onGeolocationStop();
    // onGeolocationStationary();
  }

  //--------------------------------------------------
  // UPDATING
  //--------------------------------------------------

  // componentWillUpdate = nextProps => {
  //   nextProps.trail.trackingStatus
  //     ? BackgroundGeolocation.start()
  //     : BackgroundGeolocation.stop();
  // };

  //--------------------------------------------------
  // UNMOUNTING
  //--------------------------------------------------

  // componentWillUnmount() {
  //   // unregister all event listeners
  //   BackgroundGeolocation.events.forEach(event =>
  //     BackgroundGeolocation.removeAllListeners(event)
  //   );
  // }

  // //--------------------------------------------------
  // // ACTION AT EACH GPS POINT TAKEN IN
  // //--------------------------------------------------

  // onGeolocationPing = () => {
  //   BackgroundGeolocation.on("location", location => {
  //     BackgroundGeolocation.startTask(taskKey => {
  //       this.props.addLocationPointToTrail({
  //         longitude: location.longitude,
  //         latitude: location.latitude
  //       });
  //       if (this.props.trail.coordinates.length > 1) {
  //         const lineString = makeLineString(this.props.trail.coordinates);

  //         this.setState({
  //           route: lineString
  //         });
  //       }
  //       BackgroundGeolocation.endTask(taskKey);
  //     });
  //   });
  // };

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
  // PRESS TOGGLE TRACKING
  //--------------------------------------------------

  _onPressToggleTracking = () => {
    // this.props.trail.trackingStatus
    //   ? BackgroundGeolocation.stop()
    //   : BackgroundGeolocation.start();

    if (this.props.trail.trackingStatus === false) {
      backgroundEvent = BackgroundTimer.setInterval(() => {
        console.log("tic");

        navigator.geolocation.getCurrentPosition(
          position => {
            this.props.addLocationPointToTrail({
              longitude: position.coords.longitude,
              latitude: position.coords.latitude
            });
            if (this.props.trail.coordinates.length > 1) {
              const lineString = makeLineString(this.props.trail.coordinates);

              this.setState({
                route: lineString
              });
            }
          },
          error => console.log("ERROR IN GEOLOCATOR IS: ", error),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      }, 400);
    } else {
      BackgroundTimer.clearInterval(backgroundEvent);
    }

    this.props.toggleTrackingStatus(!this.props.trail.trackingStatus);
    //TODO: TURN THIS ON***?
    //this.onGeolocationPing();
  };

  //--------------------------------------------------
  // PRESS START NEW TRAIL
  //--------------------------------------------------

  _onPressStartNewTrail = () => {
    this.props.addTrailToTrails(this.props.trail);
    this.props.generateNewTrail();
  };

  //--------------------------------------------------
  // REGION CHANGE
  //--------------------------------------------------

  _onRegionDidChange = region => {
    //SET BOUNDS
    let bounds = this.mapRef.getVisibleBounds();
  };

  _explicitSetMapRegion = region => {
    this.mapRef.flyTo([region.longitude, region.latitude]);
    this.props.modalCitySearch(false);
  };

  //--------------------------------------------------
  // SUB-RENDERING
  //--------------------------------------------------

  _renderRoute() {
    return (
      <MapboxGL.Animated.ShapeSource id="routeSource" shape={this.state.route}>
        <MapboxGL.Animated.LineLayer id="routeFill" style={layerStyles.route} />
      </MapboxGL.Animated.ShapeSource>
    );
  }

  //--------------------------------------------------
  // RENDERING
  //--------------------------------------------------

  render() {
    return (
      <View
        style={{
          flex: 1,
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          backgroundColor: "black"
        }}
      >
        <MapboxGL.MapView
          ref={ref => {
            this.mapRef = ref;
          }}
          logoEnabled={false}
          compassEnabled={false}
          showUserLocation={
            this.state.locationPermission == "authorized" ? true : false
          }
          centerCoordinate={[
            this.props.user.userCity.longitude,
            this.props.user.userCity.latitude
          ]}
          userTrackingMode={MapboxGL.UserTrackingModes.Follow}
          styleURL={"mapbox://styles/greatwillow/cja5e63er3g7s2ul5mqr5i3w7"}
          style={{ flex: 1 }}
          zoomLevel={this.props.mapUI.mapZoom}
          onRegionDidChange={region => this._onRegionDidChange(region)}
        >
          {this._renderRoute()}
        </MapboxGL.MapView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            position: "absolute",
            top: 5,
            right: 5,
            left: 5,
            height: 60,
            backgroundColor: "rgba(0,0,0,0.7)",
            borderRadius: 5
          }}
        >
          <TouchableOpacity
            style={styles.searchIcon}
            onPress={this._onPressUserLocationSearch}
          >
            <Icon name="search-web" size={40} color={commonColors.GREEN} />
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.trackingIcon}
              onPress={this._onPressStartNewTrail}
            >
              <Icon
                name="map-marker-plus"
                size={40}
                color={commonColors.GREEN}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.trackingIcon}
              onPress={this._onPressToggleTracking}
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
          </View>
        </View>
        <TouchableOpacity
          style={styles.zoomOutIcon}
          onPress={this._onPressMapZoomOut}
        >
          <Icon name="minus-circle" size={50} color={commonColors.DARK_GREY} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.zoomInIcon}
          onPress={this._onPressMapZoomIn}
        >
          <Icon name="plus-circle" size={50} color={commonColors.DARK_GREY} />
        </TouchableOpacity>
        <ModalCitySearch
          explicitSetMapRegion={region => this._explicitSetMapRegion(region)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchIcon: {
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

//--------------------------------------------------
// LAYER STYLES
//--------------------------------------------------

const layerStyles = MapboxGL.StyleSheet.create({
  route: {
    lineColor: commonColors.PINK,
    lineWidth: 5,
    lineOpacity: 0.84
  }
});

//--------------------------------------------------
// CONNECT
//--------------------------------------------------

const mapStateToProps = state => ({
  user: state.user,
  mapUI: state.mapUI,
  modalUI: state.modalUI,
  trail: state.trail
});

const mapDispatchToProps = dispatch => ({
  modalCitySearch: visible => dispatch(actions.modalCitySearch(visible)),
  setUserCity: userCity => dispatch(actions.setUserCity(userCity)),
  setMapRegion: mapRegion => dispatch(actions.setMapRegion(mapRegion)),
  setMapZoom: mapZoom => dispatch(actions.setMapZoom(mapZoom)),
  addLocationPointToTrail: locationPoint =>
    dispatch(actions.addLocationPointToTrail(locationPoint)),
  toggleTrackingStatus: trackingStatus =>
    dispatch(actions.toggleTrackingStatus(trackingStatus)),
  addTrailToTrails: trail => dispatch(actions.addTrailToTrails(trail)),
  generateNewTrail: () => dispatch(actions.generateNewTrail())
});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
