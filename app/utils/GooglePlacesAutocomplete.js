//
//NOTE: The code in this file is a modified version of code originally
// published on npm within the package
// 'react-native-google-places-autocomplete' by Farid Safi
// See: https://github.com/FaridSafi/react-native-google-places-autocomplete
//

import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  FlatList,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Platform,
  ActivityIndicator,
  PixelRatio
} from "react-native";
import Qs from "qs";
import debounce from "lodash.debounce";

import TextInputSingleLine from "../components/TextInputSingleLine";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/dimensions";
import commonColors from "../constants/colors";

const defaultStyles = {
  textInputContainer: {
    backgroundColor: "white",
    height: 50
  },
  listView: {
    backgroundColor: "white",
    height: SCREEN_HEIGHT / 2 - 200,
    width: SCREEN_WIDTH / 6 * 4,
    borderRadius: 5,
    borderColor: commonColors.LIGHT_GREY,
    borderWidth: 1
  },
  textInput: {
    width: SCREEN_WIDTH / 6 * 4,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5
  },
  row: {
    padding: 13,
    height: 50,
    flexDirection: "row"
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#c8c7cc"
  },
  description: {},
  loader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    height: 20
  }
};

export default class GooglePlacesAutocomplete extends Component {
  _isMounted = false;
  _results = [];
  _requests = [];

  constructor(props) {
    super(props);
    this.state = this.getInitialState.call(this);
  }

  getInitialState = () => ({
    text: this.props.getDefaultValue(),
    dataSource: this.buildRowsFromResults([])
  });

  setAddressText = address => this.setState({ text: address });

  getAddressText = () => this.state.text;

  buildRowsFromResults = results => {
    let res = [];
    res = res.map(place => ({
      ...place
    }));

    return [...res, ...results];
  };

  componentWillMount() {
    this._request = this.props.debounce
      ? debounce(this._request, this.props.debounce)
      : this._request;
  }

  componentDidMount() {
    this._isMounted = true;
    this._onChangeText(this.state.text);
  }

  componentWillReceiveProps(nextProps) {
    if (
      typeof nextProps.text !== "undefined" &&
      this.state.text !== nextProps.text
    ) {
      this._handleChangeText(nextProps.text);
    }
  }

  componentWillUnmount() {
    this._abortRequests();
    this._isMounted = false;
  }

  _abortRequests = () => {
    this._requests.map(i => i.abort());
    this._requests = [];
  };

  getCurrentLocation = () => {
    let options = {
      enableHighAccuracy: false,
      timeout: 20000,
      maximumAge: 1000
    };

    if (this.props.enableHighAccuracyLocation && Platform.OS === "android") {
      options = {
        enableHighAccuracy: true,
        timeout: 20000
      };
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        if (this.props.nearbyPlacesAPI === "None") {
          let currentLocation = {
            description: this.props.currentLocationLabel,
            geometry: {
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
            }
          };

          this._disableRowLoaders();
          this.props.onPress(currentLocation, currentLocation);
        } else {
          this._requestNearby(
            position.coords.latitude,
            position.coords.longitude
          );
        }
      },
      error => {
        this._disableRowLoaders();
        alert(error.message);
      },
      options
    );
  };

  _onPress = rowData => {
    if (this.props.fetchDetails === true) {
      if (rowData.isLoading === true) {
        // already requesting
        return;
      }

      this._abortRequests();
      this._enableRowLoader(rowData);

      // fetch details
      const request = new XMLHttpRequest();
      this._requests.push(request);
      request.timeout = this.props.timeout;
      request.ontimeout = this.props.onTimeout;
      request.onreadystatechange = () => {
        if (request.readyState !== 4) return;

        if (request.status === 200) {
          const responseJSON = JSON.parse(request.responseText);

          if (responseJSON.status === "OK") {
            if (this._isMounted === true) {
              const details = responseJSON.result;
              this._disableRowLoaders();

              this.setState({
                text: this._renderDescription(rowData)
              });

              delete rowData.isLoading;
              this.props.onPress(rowData, details);
            }
          } else {
            this._disableRowLoaders();

            if (this.props.autoFillOnNotFound) {
              this.setState({
                text: this._renderDescription(rowData)
              });
              delete rowData.isLoading;
            }

            if (!this.props.onNotFound) {
              console.warn(
                "google places autocomplete: " + responseJSON.status
              );
            } else {
              this.props.onNotFound(responseJSON);
            }
          }
        } else {
          this._disableRowLoaders();

          if (!this.props.onFail) {
            console.warn(
              "google places autocomplete: request could not be completed or has been aborted"
            );
          } else {
            this.props.onFail();
          }
        }
      };

      const TEST_URI =
        "https://maps.googleapis.com/maps/api/place/details/json?" +
        Qs.stringify({
          key: this.props.query.key,
          placeid: rowData.place_id,
          language: this.props.query.language
        });

      request.open("GET", TEST_URI);

      if (this.props.query.origin !== null) {
        request.setRequestHeader("Referer", this.props.query.origin);
      }

      request.send();
    } else if (rowData.isCurrentLocation === true) {
      this._enableRowLoader(rowData);

      this.setState({
        text: this._renderDescription(rowData)
      });

      delete rowData.isLoading;
      this.getCurrentLocation();
    } else {
      this.setState({
        text: this._renderDescription(rowData)
      });

      delete rowData.isLoading;
    }
  };

  _enableRowLoader = rowData => {
    let rows = this.buildRowsFromResults(this._results);
    for (let i = 0; i < rows.length; i++) {
      if (
        rows[i].place_id === rowData.place_id ||
        (rows[i].isCurrentLocation === true &&
          rowData.isCurrentLocation === true)
      ) {
        rows[i].isLoading = true;
        this.setState({
          dataSource: rows
        });
        break;
      }
    }
  };

  _disableRowLoaders = () => {
    if (this._isMounted === true) {
      for (let i = 0; i < this._results.length; i++) {
        if (this._results[i].isLoading === true) {
          this._results[i].isLoading = false;
        }
      }

      this.setState({
        dataSource: this.buildRowsFromResults(this._results)
      });
    }
  };

  _filterResultsByTypes = (responseJSON, types) => {
    if (types.length === 0) return responseJSON.results;

    var results = [];
    for (let i = 0; i < responseJSON.results.length; i++) {
      let found = false;

      for (let j = 0; j < types.length; j++) {
        if (responseJSON.results[i].types.indexOf(types[j]) !== -1) {
          found = true;
          break;
        }
      }

      if (found === true) {
        results.push(responseJSON.results[i]);
      }
    }
    return results;
  };

  _requestNearby = (latitude, longitude) => {
    this._abortRequests();

    if (
      latitude !== undefined &&
      longitude !== undefined &&
      latitude !== null &&
      longitude !== null
    ) {
      const request = new XMLHttpRequest();
      this._requests.push(request);
      request.timeout = this.props.timeout;
      request.ontimeout = this.props.onTimeout;
      request.onreadystatechange = () => {
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          const responseJSON = JSON.parse(request.responseText);

          this._disableRowLoaders();

          if (typeof responseJSON.results !== "undefined") {
            if (this._isMounted === true) {
              var results = [];
              if (this.props.nearbyPlacesAPI === "GoogleReverseGeocoding") {
                results = this._filterResultsByTypes(
                  responseJSON,
                  this.props.filterReverseGeocodingByTypes
                );
              } else {
                results = responseJSON.results;
              }

              this.setState({
                dataSource: this.buildRowsFromResults(results)
              });
            }
          }
          if (typeof responseJSON.error_message !== "undefined") {
            console.warn(
              "google places autocomplete: " + responseJSON.error_message
            );
          }
        } else {
          // console.warn("google places autocomplete: request could not be completed or has been aborted");
        }
      };

      let url = "";
      if (this.props.nearbyPlacesAPI === "GoogleReverseGeocoding") {
        // your key must be allowed to use Google Maps Geocoding API
        url =
          "https://maps.googleapis.com/maps/api/geocode/json?" +
          Qs.stringify({
            latlng: latitude + "," + longitude,
            key: this.props.query.key,
            ...this.props.GoogleReverseGeocodingQuery
          });
      } else {
        url =
          "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" +
          Qs.stringify({
            location: latitude + "," + longitude,
            key: this.props.query.key,
            ...this.props.GooglePlacesSearchQuery
          });
      }

      request.open("GET", url);
      if (this.props.query.origin !== null) {
        request.setRequestHeader("Referer", this.props.query.origin);
      }

      request.send();
    } else {
      this._results = [];
      this.setState({
        dataSource: this.buildRowsFromResults([])
      });
    }
  };

  _request = text => {
    this._abortRequests();
    if (text.length >= this.props.minLength) {
      const request = new XMLHttpRequest();
      this._requests.push(request);
      request.timeout = this.props.timeout;
      request.ontimeout = this.props.onTimeout;
      request.onreadystatechange = () => {
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          const responseJSON = JSON.parse(request.responseText);
          if (typeof responseJSON.predictions !== "undefined") {
            if (this._isMounted === true) {
              this._results = responseJSON.predictions;
              this.setState({
                dataSource: this.buildRowsFromResults(responseJSON.predictions)
              });
            }
          }
          if (typeof responseJSON.error_message !== "undefined") {
            console.warn(
              "google places autocomplete: " + responseJSON.error_message
            );
          }
        } else {
          console.warn(
            "google places autocomplete: request could not be completed or has been aborted"
          );
        }
      };
      request.open(
        "GET",
        "https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=" +
          encodeURIComponent(text) +
          "&" +
          Qs.stringify(this.props.query)
      );
      if (this.props.query.origin !== null) {
        request.setRequestHeader("Referer", this.props.query.origin);
      }

      request.send();
    } else {
      this._results = [];
      this.setState({
        dataSource: this.buildRowsFromResults([])
      });
    }
  };

  _onChangeText = text => {
    this._request(text);

    this.setState({
      text: text
    });
  };

  _handleChangeText = text => {
    this._onChangeText(text);

    const onChangeText =
      this.props &&
      this.props.textInputProps &&
      this.props.textInputProps.onChangeText;

    if (onChangeText) {
      onChangeText(text);
    }
  };

  _getRowLoader() {
    return <ActivityIndicator animating={true} size="small" />;
  }

  _renderRowData = rowData => {
    if (this.props.renderRow) {
      return this.props.renderRow(rowData);
    }
    return (
      <Text
        style={[
          { flex: 1 },
          defaultStyles.description,
          this.props.styles.description
        ]}
        numberOfLines={1}
      >
        {this._renderDescription(rowData)}
      </Text>
    );
  };

  _renderDescription = rowData => {
    if (this.props.renderDescription) {
      return this.props.renderDescription(rowData);
    }
    return rowData.description || rowData.formatted_address || rowData.name;
  };

  _renderLoader = rowData => {
    if (rowData.isLoading === true) {
      return <View style={defaultStyles.loader}>{this._getRowLoader()}</View>;
    }

    return null;
  };

  _renderRow = (rowData = {}, sectionID, rowID) => {
    return (
      <ScrollView
        style={{ flex: 1 }}
        scrollEnabled={this.props.isRowScrollable}
        keyboardShouldPersistTaps={this.props.keyboardShouldPersistTaps}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <TouchableHighlight
          style={{ width: SCREEN_WIDTH }}
          onPress={() => this._onPress(rowData)}
          underlayColor={this.props.listUnderlayColor || "#c8c7cc"}
        >
          <View style={defaultStyles.row}>
            {this._renderRowData(rowData)}
            {this._renderLoader(rowData)}
          </View>
        </TouchableHighlight>
      </ScrollView>
    );
  };

  _renderSeparator = (sectionID, rowID) => {
    if (rowID == this.state.dataSource.length - 1) {
      return null;
    }
    return (
      <View key={`${sectionID}-${rowID}`} style={defaultStyles.separator} />
    );
  };

  _getFlatList = () => {
    const keyGenerator = () =>
      Math.random()
        .toString(36)
        .substr(2, 10);
    return (
      <FlatList
        style={defaultStyles.listView}
        data={this.state.dataSource}
        keyExtractor={keyGenerator}
        extraData={[this.state.dataSource, this.props]}
        ItemSeparatorComponent={this._renderSeparator}
        renderItem={({ item }) => this._renderRow(item)}
        {...this.props}
      />
    );
  };
  render() {
    let { onFocus, ...userProps } = this.props.textInputProps;
    return (
      <View style={{ flex: 1 }}>
        {!this.props.textInputHide && (
          <TextInputSingleLine
            ref="textInput"
            style={defaultStyles.textInput}
            value={this.state.text}
            placeholder={"Search for your City!"}
            //returnKeyType={"search"}
            autoFocus={true}
            onFocus={
              onFocus
                ? () => {
                    //this._onFocus();
                    onFocus();
                  }
                : null //this._onFocus
            }
            onSubmitEditing={this.props.onSubmitEditing}
            {...userProps}
            onChangeText={this._handleChangeText}
          />
        )}

        {this._getFlatList()}
        {this.props.children}
      </View>
    );
  }
}

GooglePlacesAutocomplete.propTypes = {
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  underlineColorAndroid: PropTypes.string,
  //returnKeyType: PropTypes.string,
  onPress: PropTypes.func,
  onNotFound: PropTypes.func,
  onFail: PropTypes.func,
  minLength: PropTypes.number,
  fetchDetails: PropTypes.bool,
  autoFocus: PropTypes.bool,
  autoFillOnNotFound: PropTypes.bool,
  getDefaultValue: PropTypes.func,
  timeout: PropTypes.number,
  onTimeout: PropTypes.func,
  query: PropTypes.object,
  GoogleReverseGeocodingQuery: PropTypes.object,
  GooglePlacesSearchQuery: PropTypes.object,
  styles: PropTypes.object,
  textInputProps: PropTypes.object,
  currentLocation: PropTypes.bool,
  currentLocationLabel: PropTypes.string,
  nearbyPlacesAPI: PropTypes.string,
  enableHighAccuracyLocation: PropTypes.bool,
  filterReverseGeocodingByTypes: PropTypes.array,
  enableEmptySections: PropTypes.bool,
  renderDescription: PropTypes.func,
  renderRow: PropTypes.func,
  listUnderlayColor: PropTypes.string,
  debounce: PropTypes.number,
  isRowScrollable: PropTypes.bool,
  text: PropTypes.string,
  textInputHide: PropTypes.bool
};
GooglePlacesAutocomplete.defaultProps = {
  placeholder: "Search",
  placeholderTextColor: "#A8A8A8",
  isRowScrollable: true,
  underlineColorAndroid: "transparent",
  //returnKeyType: "default",
  onPress: () => {},
  onNotFound: () => {},
  onFail: () => {},
  minLength: 0,
  fetchDetails: false,
  autoFocus: false,
  autoFillOnNotFound: false,
  keyboardShouldPersistTaps: "always",
  getDefaultValue: () => "",
  timeout: 20000,
  onTimeout: () => console.warn("google places autocomplete: request timeout"),
  query: {
    key: "missing api key",
    language: "en",
    types: "geocode"
  },
  GoogleReverseGeocodingQuery: {},
  GooglePlacesSearchQuery: {
    rankby: "distance",
    types: "food"
  },
  styles: {},
  textInputProps: {},
  currentLocation: false,
  currentLocationLabel: "Current location",
  nearbyPlacesAPI: "GooglePlacesSearch",
  enableHighAccuracyLocation: true,
  filterReverseGeocodingByTypes: [],
  enableEmptySections: true,
  debounce: 0,
  textInputHide: false
};
