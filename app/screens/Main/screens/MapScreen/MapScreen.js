import React, { Component } from "react";
import {
  Alert,
  Geolocation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../../../../data/appActions";

import BackgroundGeolocation from "react-native-mauron85-background-geolocation";
import MapboxGL from "@mapbox/react-native-mapbox-gl";
import Permissions from "react-native-permissions";
import GoogleAutocompleteSearch from "./GoogleAutocompleteSearch";
import { lineString as makeLineString } from "@turf/helpers";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/dimensions";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import commonColors from "../../../../constants/colors";
import ModalCitySearch from "./ModalCitySearch";
//import { modalCitySearch } from "../../../../data/appActions";
//import exampleIcon from '../../../../assets/exampleIcon.png';

MapboxGL.setAccessToken(
  "pk.eyJ1IjoiZ3JlYXR3aWxsb3ciLCJhIjoiY2phNGJkNW05YTg1ajJ3czR2MjRkamN4ZyJ9.4QQ9UW5OoFMq6A5LbCgMXA"
);

class MapScreen extends Component {
  constructor() {
    super();
    this.state = {
      locationPermission: "undetermined",
      route: []
    };
  }

  //--------------------------------------------------
  // MOUNTING/ CHECKING PERMISSION --> may not need?
  //--------------------------------------------------

  componentDidMount() {
    Permissions.request("location").then(response => {
      this.setState({
        locationPermission: response
      });
    });

    //--------------------------------------------------
    // GEOLOCATION CONFIG
    //--------------------------------------------------

    BackgroundGeolocation.configure({
      desiredAccuracy: 0,
      stationaryRadius: 10,
      distanceFilter: 3,
      // notificationTitle: "Background tracking",
      // notificationText: "enabled",
      debug: false, //for sounds
      startOnBoot: false,
      stopOnTerminate: false,
      locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
      interval: 0,
      stopOnStillActivity: true
    });

    //--------------------------------------------------
    // CHECK IF APP IS IN BACKGROUND
    //--------------------------------------------------

    BackgroundGeolocation.on("background", () => {
      console.log("[INFO] App is in background");
    });

    BackgroundGeolocation.on("foreground", () => {
      console.log("[INFO] App is in foreground");
    });

    //--------------------------------------------------
    // CHECKING PERMISSION STATUS
    //--------------------------------------------------

    BackgroundGeolocation.checkStatus(status => {
      console.log(
        "[INFO] BackgroundGeolocation service is running",
        status.isRunning
      );
      console.log(
        "[INFO] BackgroundGeolocation service has permissions",
        status.hasPermissions
      );
      console.log(
        "[INFO] BackgroundGeolocation auth status: " + status.authorization
      );

      if (!status.isRunning) {
        BackgroundGeolocation.start();
      }
    });

    //--------------------------------------------------
    // ACTION AT EACH GPS POINT TAKEN IN
    //--------------------------------------------------

    BackgroundGeolocation.on("location", location => {
      BackgroundGeolocation.startTask(taskKey => {
        this.props.addLocationPointToTrail({
          longitude: location.longitude,
          latitude: location.latitude
        });

        console.log("====================================");
        console.log("INPUTTED IS ", this.props.trail);
        console.log("====================================");
        if (this.props.trail.coordinates.length > 2) {
          const lineString = makeLineString(this.props.trail.coordinates);

          this.setState({
            route: lineString
          });
        }

        console.log("====================================");
       // console.log("LINESTRING IS ", lineString);
        console.log("ROUTE IS ", this.state.route);
        console.log("====================================");

        BackgroundGeolocation.endTask(taskKey);
      });
    });

    BackgroundGeolocation.on("stationary", stationaryLocation => {
      // handle stationary locations here
      Actions.sendLocation(stationaryLocation);
    });

    BackgroundGeolocation.on("error", error => {
      console.log("[ERROR] BackgroundGeolocation error:", error);
    });

    BackgroundGeolocation.on("start", () => {
      console.log("[INFO] BackgroundGeolocation service has been started");
    });

    BackgroundGeolocation.on("stop", () => {
      console.log("[INFO] BackgroundGeolocation service has been stopped");
    });

    BackgroundGeolocation.on("authorization", status => {
      console.log(
        "[INFO] BackgroundGeolocation authorization status: " + status
      );
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        Alert.alert(
          "Location services are disabled",
          "Would you like to open location settings?",
          [
            {
              text: "Yes",
              onPress: () => BackgroundGeolocation.showLocationSettings()
            },
            {
              text: "No",
              onPress: () => console.log("No Pressed"),
              style: "cancel"
            }
          ]
        );
      }
    });
  }

  //--------------------------------------------------
  // MODAL UI SEARCH
  //--------------------------------------------------

  _onPressUserLocationSearch = () => {
    this.props.modalCitySearch(true);
  };

  //--------------------------------------------------
  // ZOOM
  //--------------------------------------------------

  _onPressMapZoomIn = () => {
    this.props.setMapZoom(this.props.mapUI.mapZoom + 1);
  };

  _onPressMapZoomOut = () => {
    this.props.setMapZoom(this.props.mapUI.mapZoom - 1);
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
    const myCoords = [
      [-73.5896, 45.50399833333333],
      [-73.58979833333333, 45.50390000000001],
      [-73.59059833333335, 45.5035],
      [45.503099999999996, -73.5913],
      [45.50279999999999, -73.59179999999999],
      [45.502698333333335, -73.59199833333334],
      [45.50279999999999, -73.5929],
      [45.50289833333333, -73.59329833333332]
    ];

    const line = makeLineString(myCoords);

    console.log("====================================");
    console.log("LINE IS ", line);
    console.log("====================================");

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
          compassEnabled={true}
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

        <TouchableOpacity
          style={styles.searchIcon}
          onPress={this._onPressUserLocationSearch}
        >
          <Icon name="search-web" size={40} color={commonColors.PINK} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.zoomInIcon}
          onPress={this._onPressMapZoomIn}
        >
          <Icon name="plus-circle" size={50} color={commonColors.DARK_GREY} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.zoomOutIcon}
          onPress={this._onPressMapZoomOut}
        >
          <Icon name="minus-circle" size={50} color={commonColors.DARK_GREY} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.trackingIcon}
          onPress={this._onPressUserLocationSearch}
        >
          <Icon name="radar" size={50} color={commonColors.DARK_GREY} />
        </TouchableOpacity>
        <ModalCitySearch
          explicitSetMapRegion={region => this._explicitSetMapRegion(region)}
        />
      </View>
    );
  }

  //--------------------------------------------------
  // UNMOUNTING
  //--------------------------------------------------

  componentWillUnmount() {
    // unregister all event listeners
    BackgroundGeolocation.events.forEach(event =>
      BackgroundGeolocation.removeAllListeners(event)
    );
  }
}

const styles = StyleSheet.create({
  searchIcon: {
    backgroundColor: "rgba(0,0,0,0)",
    position: "absolute",
    top: 20,
    right: 20
  },
  zoomInIcon: {
    backgroundColor: "rgba(0,0,0,0)",
    position: "absolute",
    bottom: 80,
    right: 20
  },
  zoomOutIcon: {
    backgroundColor: "rgba(0,0,0,0)",
    position: "absolute",
    bottom: 20,
    right: 20
  },
  trackingIcon: {
    backgroundColor: "rgba(0,0,0,0)",
    position: "absolute",
    bottom: 20,
    left: 20
  }
});

//--------------------------------------------------
// LAYER STYLES
//--------------------------------------------------

const layerStyles = MapboxGL.StyleSheet.create({
  route: {
    lineColor: "blue",
    lineWidth: 10,
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
    dispatch(actions.addLocationPointToTrail(locationPoint))
});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
