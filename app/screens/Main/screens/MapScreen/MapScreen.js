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

//import BackgroundGeolocation from "react-native-mauron85-background-geolocation";
import MapboxGL from "@mapbox/react-native-mapbox-gl";
import BackgroundTimer from "react-native-background-timer";
//TODO: Get rid of RN Permisions Library?
//import Permissions from "react-native-permissions";
import GoogleAutocompleteSearch from "./GoogleAutocompleteSearch";
import { lineString as makeLineString } from "@turf/helpers";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/dimensions";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import commonColors from "../../../../constants/colors";
import ModalCitySearch from "./ModalCitySearch";
import MapButtons from "./MapButtons";
import MapButtonsZoom from "./MapButtonsZoom";
import TrailCenterPoints from "./TrailCenterPoints";
import TrailLines from "./TrailLines";
import TrailCurrentLine from "./TrailCurrentLine";
import MockTrails from "./MockTrails";
import MockCenterPoints from "./MockCenterPoints";

//import { modalCitySearch } from "../../../../data/appActions";

import {
    euclideanDistance,
    requestGeolocationPermission,
    calculateTrailLength
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
            trail: {},
            trails: [],
            followingUser: false
        };
    }

    //--------------------------------------------------
    // MOUNTING
    //--------------------------------------------------

    componentDidMount = () => {
        //TODO: May still need the following for IOS?
        // Permissions.request("location").then(response => {
        //   alert('Permission is ',response)
        //   console.log("PERMISSION IS ", response)
        //   this.setState({
        //     locationPermission: response
        //   });
        // });
        requestGeolocationPermission();
    };

    //--------------------------------------------------
    // RECEIVING NEW PROPS
    //--------------------------------------------------

    componentWillReceiveProps = nextProps => {
        //Following Mode
        if (this.props.mapUI.mapFollowMode !== nextProps.mapUI.mapFollowMode) {
            this.setState({
                followingUser: nextProps.mapUI.mapFollowMode
            });
        }
        //With New Trails Props
        if (this.props.trails.trails !== nextProps.trails.trails) {
            this.setState({
                trails: nextProps.trails.trails
            });
        }
    };

    //--------------------------------------------------
    // PRESS TOGGLE FOLLOW MODE
    //--------------------------------------------------

    _onPressToggleFollowMode = () => {
        calculateTrailLength(this.props.trails);
        this.setState(
            {
                followingUser: !this.props.mapUI.mapFollowMode
            },
            () => {
                this.props.setMapFollowMode(!this.props.mapUI.mapFollowMode);
            }
        );
    };

    //--------------------------------------------------
    // GETTING DISTANCE TO LAST POINT
    //--------------------------------------------------

    getDistanceToLastPoint(position) {
        let givenDistance;
        if (this.props.trail.coordinates.length >= 1) {
            const lastPointLongitude = this.props.trail.coordinates[
                this.props.trail.coordinates.length - 1
            ][0];
            const lastPointLatitude = this.props.trail.coordinates[
                this.props.trail.coordinates.length - 1
            ][1];
            const currentPointLongitude = position.coords.longitude;
            const currentPointLatitude = position.coords.latitude;

            givenDistance = euclideanDistance(
                lastPointLongitude,
                lastPointLatitude,
                currentPointLongitude,
                currentPointLatitude
            );
            return givenDistance;
        }
        return;
    }

    //--------------------------------------------------
    // ADD POINT TO TRAIL
    //--------------------------------------------------

    addTrailPoint(position) {
        const givenDistance = this.getDistanceToLastPoint(position);

        if (this.props.trail.coordinates.length < 1 || givenDistance >= 1) {
            this.props.addLocationPointToTrail({
                longitude: position.coords.longitude,
                latitude: position.coords.latitude
            });
        }
    }

    //--------------------------------------------------
    // TRACK TRAIL
    //--------------------------------------------------

    trackCurrentTrail() {
        let backgroundEvent;
        if (this.props.mapUI.trackingStatus === true) {
            backgroundEvent = BackgroundTimer.setInterval(() => {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        if (this.props.mapUI.trackingStatus === true) {
                            this.addTrailPoint(position);
                        }
                    },
                    error => console.log("ERROR IN GEOLOCATOR IS: ", error),
                    {
                        enableHighAccuracy: true,
                        timeout: 20000,
                        maximumAge: 2000
                    }
                );
            }, 500);
        } else {
            BackgroundTimer.clearInterval(backgroundEvent);
            this.props.addTrailToTrails(this.props.trail);
            this.props.setTrailCenterPoint(this.props.trail);
            this.props.generateNewTrail();
        }
    }

    //--------------------------------------------------
    // PRESS TOGGLE TRACKING
    //--------------------------------------------------

    _onPressToggleTracking = () => {
        let self = this;
        function setTrackingStatus() {
            let self2 = self;
            return new Promise(resolve => {
                self2.props.mapUI.trackingStatus === false
                    ? self2.props.toggleTrackingStatus(true)
                    : self2.props.toggleTrackingStatus(false);
                resolve();
            });
        }

        async function trackingSetup() {
            await setTrackingStatus();
            if (self.props.mapUI.trackingStatus === true) {
                self.trackCurrentTrail();
            }
        }
        trackingSetup();
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
                        this.state.locationPermission == "authorized"
                            ? true
                            : false
                    }
                    centerCoordinate={[
                        this.props.user.userCity.longitude,
                        this.props.user.userCity.latitude
                    ]}
                    userTrackingMode={
                        this.state.followingUser
                            ? MapboxGL.UserTrackingModes.Follow
                            : MapboxGL.UserTrackingModes.None
                    }
                    styleURL={
                        "mapbox://styles/greatwillow/cja5e63er3g7s2ul5mqr5i3w7"
                    }
                    style={{ flex: 1 }}
                    zoomLevel={this.props.mapUI.mapZoom}
                    onRegionDidChange={region =>
                        this._onRegionDidChange(region)
                    }
                >
                    <TrailLines {...this.props} />
                    <TrailCurrentLine {...this.props} />
                    <TrailCenterPoints {...this.props} />
                    <MockTrails {...this.props} />
                    <MockCenterPoints {...this.props} />
                </MapboxGL.MapView>
                <MapButtons
                    onPressToggleTracking={this._onPressToggleTracking}
                    onPressToggleFollowMode={this._onPressToggleFollowMode}
                    {...this.props}
                />
                <MapButtonsZoom {...this.props} />
                <ModalCitySearch
                    explicitSetMapRegion={region =>
                        this._explicitSetMapRegion(region)
                    }
                />
            </View>
        );
    }
}

//--------------------------------------------------
// STYLES
//--------------------------------------------------

const styles = StyleSheet.create({});

//--------------------------------------------------
// CONNECT
//--------------------------------------------------

const mapStateToProps = state => ({
    user: state.user,
    mapUI: state.mapUI,
    modalUI: state.modalUI,
    trail: state.trail,
    trails: state.trails
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
    setTrailCenterPoint: trail => dispatch(actions.setTrailCenterPoint(trail)),
    addTrailToTrails: trail => dispatch(actions.addTrailToTrails(trail)),
    generateNewTrail: () => dispatch(actions.generateNewTrail()),
    setMapFollowMode: mapFollowMode =>
        dispatch(actions.setMapFollowMode(mapFollowMode))
});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
