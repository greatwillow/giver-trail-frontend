import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";
//import Mapbox from "@mapbox/react-native-mapbox-gl";
import Permissions from "react-native-permissions";

import * as actions from "../../../../data/appActions";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/dimensions";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import commonColors from "../../../../constants/colors";
import GoogleAutocompleteSearch from "./GoogleAutocompleteSearch";
import ModalCitySearch from "./ModalCitySearch";
import { modalCitySearch } from "../../../../data/appActions";

// Mapbox.setAccessToken(
//   "pk.eyJ1IjoiZ3JlYXR3aWxsb3ciLCJhIjoiY2phNGJkNW05YTg1ajJ3czR2MjRkamN4ZyJ9.4QQ9UW5OoFMq6A5LbCgMXA"
// );
class MapBoxScreen extends Component {
  constructor() {
    super()
    this.state = {
      locationPermission: null
    }
  }

  componentDidMount() {
    
    _requestGeolocationPermission = () => {
      Permissions.request('location')
        .then(response => {
          this.setState({
            locationPermission: response
          })
        })
    }
  }


  _onPressUserLocationSearch = () => {
    this.props.modalCitySearch(true);
  };

  _onPressMapZoomIn = () => {
    this.props.setMapZoom(this.props.mapUI.mapZoom + 1);
  };

  _onPressMapZoomOut = () => {
    console.log("====================================");
    console.log("ZOOOOM ", this.props.mapUI);
    console.log("====================================");
    this.props.setMapZoom(this.props.mapUI.mapZoom - 1);
  };

  _onRegionDidChange = region => {
    let bounds = this.mapRef.getVisibleBounds();
  };

  _explicitSetMapRegion = region => {
    this.mapRef.flyTo([region.longitude, region.latitude]);
    this.props.modalCitySearch(false);
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Text> Works</Text>
        </View>


      // <Mapbox.MapView
      //   ref={ref => {
      //     this.mapRef = ref;
      //   }}
      //   logoEnabled={false}
      //   compassEnabled={true}
      //   //showUserLocation={(this.state.locationPermission == 'authorized') ? true : false}
      //   centerCoordinate={[
      //     this.props.user.userCity.longitude,
      //     this.props.user.userCity.latitude
      //   ]}
      //   //userTrackingMode={Mapbox.UserTrackingModes.Follow}
      //   styleURL={"mapbox://styles/greatwillow/cja5e63er3g7s2ul5mqr5i3w7"}
      //   style={{ flex: 1 }}
      //   zoomLevel={this.props.mapUI.mapZoom}
      //   onRegionDidChange={region => this._onRegionDidChange(region)}
      // />

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

export default connect(mapStateToProps, mapDispatchToProps)(MapBoxScreen);


            //   <TouchableOpacity
            //   style={styles.searchIcon}
            //   onPress={this._onPressUserLocationSearch}
            // >
            //   <Icon name="search-web" size={40} color={commonColors.PINK} />
            // </TouchableOpacity>
            // <TouchableOpacity
            //   style={styles.zoomInIcon}
            //   onPress={this._onPressMapZoomIn}
            // >
            //   <Icon name="plus-circle" size={50} color={commonColors.DARK_GREY} />
            // </TouchableOpacity>
            // <TouchableOpacity
            //   style={styles.zoomOutIcon}
            //   onPress={this._onPressMapZoomOut}
            // >
            //   <Icon name="minus-circle" size={50} color={commonColors.DARK_GREY} />
            // </TouchableOpacity>
            // <TouchableOpacity
            //   style={styles.trackingIcon}
            //   onPress={this._onPressUserLocationSearch}
            // >
            //   <Icon name="radar" size={50} color={commonColors.DARK_GREY} />
            // </TouchableOpacity>
            // <ModalCitySearch
            //   explicitSetMapRegion={region => this._explicitSetMapRegion(region)}
            // />