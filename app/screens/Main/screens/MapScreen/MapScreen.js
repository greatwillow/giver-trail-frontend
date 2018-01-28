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
import MapButtons from "./MapButtons";
import TrailCenterPoints from "./TrailCenterPoints";
import TrailLines from "./TrailLines";
import { generateTrailCenterPointFeatureCollection } from "./generateTrailCenterPointFeatureCollection";
//import { modalCitySearch } from "../../../../data/appActions";

import {
    requestGeolocationPermission,
    calculateTrailLength,
    euclideanDistance
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
    // PRESS TOGGLE TRACKING
    //--------------------------------------------------

    _onPressToggleTracking = () => {
        // console.log("======GENERATING TRAIL=============");
        // this.props.generateNewTrail();

        if (this.props.mapUI.trackingStatus === false) {
            this.props.toggleTrackingStatus(true);
            backgroundEvent = BackgroundTimer.setInterval(() => {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        //initially setting distance above 5 which is min distance to get point
                        let givenDistance;
                        //Calculating distance

                        if (this.props.trail.coordinates.length >= 1) {
                            const lastPointLongitude = this.props.trail
                                .coordinates[
                                this.props.trail.coordinates.length - 1
                            ][0];
                            const lastPointLatitude = this.props.trail
                                .coordinates[
                                this.props.trail.coordinates.length - 1
                            ][1];
                            const currentPointLongitude =
                                position.coords.longitude;
                            const currentPointLatitude =
                                position.coords.latitude;

                            givenDistance = euclideanDistance(
                                lastPointLongitude,
                                lastPointLatitude,
                                currentPointLongitude,
                                currentPointLatitude
                            );
                        }

                        if (this.props.trail.coordinates.length < 1) {
                            givenDistance = 0;
                            this.props.addLocationPointToTrail({
                                longitude: position.coords.longitude,
                                latitude: position.coords.latitude
                            });
                        }

                        //If distance within bounds -> Add point to Line
                        if (givenDistance >= 1 && givenDistance < 20) {
                            console.log("=========GIVEN DIS ", givenDistance);
                            this.props.addLocationPointToTrail({
                                longitude: position.coords.longitude,
                                latitude: position.coords.latitude
                            });
                            if (this.props.trail.coordinates.length >= 1) {
                                const lineString = makeLineString(
                                    this.props.trail.coordinates
                                );

                                this.setState({
                                    trail: lineString
                                });
                            }
                            //If User is far from last point -> need to make a new trail array
                        } else if (givenDistance >= 20) {
                            console.log("=========GIVEN DIS2 ", givenDistance);
                            this.setState({ trail: {} }, () => {
                                // this.props.setTrailCenterPoint(
                                //     this.props.trail
                                // );
                                this.props.addTrailToTrails(this.props.trail);
                                // this.props.setTrailCenterPoint(
                                //     this.props.trail
                                // );
                                this.props.generateNewTrail();
                            });
                        }
                    },
                    error => console.log("ERROR IN GEOLOCATOR IS: ", error),
                    {
                        enableHighAccuracy: true,
                        timeout: 20000,
                        maximumAge: 2000
                    }
                );
            }, 1500);
        } else {
            BackgroundTimer.clearInterval(backgroundEvent);
            this.props.toggleTrackingStatus(false);
            this.setState({ trail: {} }, () => {
                console.log("THIS TRAIL IS ", this.props.trail);
                this.props.addTrailToTrails(this.props.trail);
                this.props.setTrailCenterPoint(this.props.trail);
                this.props.generateNewTrail();
            });
        }
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

    _renderCurrentTrail = () => {
        return (
            <MapboxGL.Animated.ShapeSource
                id={shortid.generate()}
                shape={this.state.trail}
            >
                <MapboxGL.Animated.LineLayer
                    id={shortid.generate()}
                    style={layerStyles.currentTrail}
                />
            </MapboxGL.Animated.ShapeSource>
        );
    };

    //--------------------------------------------------
    // RENDERING
    //--------------------------------------------------

    render() {
        let generatedTrailPoints = generateTrailCenterPointFeatureCollection(
            this.state.trails
        );

        console.log("TRAIL PNTS ARE ", generatedTrailPoints);

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
                    {this._renderCurrentTrail()}
                    <TrailCenterPoints
                        {...this.props}
                        generatedTrailPoints={generatedTrailPoints}
                    />
                    <TrailLines {...this.props} />
                </MapboxGL.MapView>
                <MapButtons
                    onPressToggleTracking={this._onPressToggleTracking}
                    onPressToggleFollowMode={this._onPressToggleFollowMode}
                    {...this.props}
                />
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
// LAYER STYLES
//--------------------------------------------------

const layerStyles = MapboxGL.StyleSheet.create({
    currentTrail: {
        lineColor: commonColors.PINK,
        lineWidth: 5,
        lineOpacity: 0.84
    }
});

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
