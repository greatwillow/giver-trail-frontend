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
import Mapbox from "@mapbox/react-native-mapbox-gl";
import Permissions from "react-native-permissions";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/dimensions";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import commonColors from "../../../../constants/colors";
import GoogleAutocompleteSearch from "./GoogleAutocompleteSearch";
import ModalCitySearch from "./ModalCitySearch";
import { modalCitySearch } from "../../../../data/appActions";

Mapbox.setAccessToken(
  "pk.eyJ1IjoiZ3JlYXR3aWxsb3ciLCJhIjoiY2phNGJkNW05YTg1ajJ3czR2MjRkamN4ZyJ9.4QQ9UW5OoFMq6A5LbCgMXA"
);

class BackgroundGeoPage extends Component {
  constructor() {
    super();
    this.state = {
      locationPermission: "undetermined",
      route: []
    };
  }

  componentDidMount() {
    Permissions.request("location").then(response => {
      this.setState({
        locationPermission: response
      });
    });

    BackgroundGeolocation.configure({
      desiredAccuracy: 10,
      stationaryRadius: 50,
      distanceFilter: 50,
      notificationTitle: "Background tracking",
      notificationText: "enabled",
      debug: true,
      startOnBoot: false,
      stopOnTerminate: false,
      locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
      interval: 10000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
      // url: "http://192.168.81.15:3000/location",
      // httpHeaders: {
      //   "X-FOO": "bar"
      // }
    });

    BackgroundGeolocation.on("location", location => {
      // handle your locations here
      // to perform long running operation on iOS

      // you need to create background task
      BackgroundGeolocation.startTask(taskKey => {

        // execute long running task
        // eg. ajax post location
        // IMPORTANT: task has to be ended by endTask
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

    BackgroundGeolocation.on("background", () => {
      console.log("[INFO] App is in background");
    });

    BackgroundGeolocation.on("foreground", () => {
      console.log("[INFO] App is in foreground");
    });

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

      // you don't need to check status before start (this is just the example)
      if (!status.isRunning) {
        BackgroundGeolocation.start(); //triggers start on start event
      }
    });

    // you can also just start without checking for status
    // BackgroundGeolocation.start();
  }

  componentWillUnmount() {
    // unregister all event listeners
    BackgroundGeolocation.events.forEach(event =>
      BackgroundGeolocation.removeAllListeners(event)
    );
  }

  _onRegionDidChange = region => {
    //SET BOUNDS
    let bounds = this.mapRef.getVisibleBounds();
  };

  render() {
    return (
      <Mapbox.MapView
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
        userTrackingMode={Mapbox.UserTrackingModes.Follow}
        styleURL={"mapbox://styles/greatwillow/cja5e63er3g7s2ul5mqr5i3w7"}
        style={{ flex: 1 }}
        zoomLevel={this.props.mapUI.mapZoom}
        onRegionDidChange={region => this._onRegionDidChange(region)}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  mapUI: state.mapUI,
  modalUI: state.modalUI
});

const mapDispatchToProps = dispatch => ({
  modalCitySearch: visible => dispatch(actions.modalCitySearch(visible)),
  setUserCity: userCity => dispatch(actions.setUserCity(userCity)),
  setMapRegion: mapRegion => dispatch(actions.setMapRegion(mapRegion)),
  setMapZoom: mapZoom => dispatch(actions.setMapZoom(mapZoom))
});

export default connect(mapStateToProps, mapDispatchToProps)(BackgroundGeoPage);
