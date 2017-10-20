"use strict";

import React, { Component } from "react";

import { Image, Modal, StyleSheet, Text, View } from "react-native";

import ButtonGeneric from "../../../../components/ButtonGeneric";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/dimensions";
import commonColors from "../../../../constants/colors";
//-------------GOOGLE PLACES
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { googlePlacesAutocompleteAPIKey } from "../../../../constants/apiKeys";
const homePlace = {
  description: "Home",
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }
};
const workPlace = {
  description: "Work",
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }
};
//--------------

class ModalGooglePlaceSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: this.props.modalVisible
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      modalVisible: nextProps.modalVisible
    });
  }

  _renderListItem = ({ item }) => {
    return (
      <ModalListItem
        id={item.key}
        title={item.title}
        onPress={this.props.onPress}
      />
    );
  };
  render() {
    return (
      <View>
        <Modal visible={this.state.modalVisible}>
          <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
              <View style={styles.listContainer}>
                <GooglePlacesAutocomplete
                  placeholder="Search for your City!"
                  minLength={2}
                  autoFocus={true}
                  returnKeyType={"search"}
                  listViewDisplayed="auto"
                  fetchDetails={true}
                  renderDescription={row => row.description}
                  onPress={(data, details = null) => {
                    console.log("GOOGLE", data, details);
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
                    //  types: "food"
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
                      height: SCREEN_HEIGHT / 2 - 200
                    }
                  }}
                />
                <ButtonGeneric onPress={this.props.onPress} />
              </View>
            </View>
            <View style={{ flex: 1 }} />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: SCREEN_WIDTH / 6 * 5,
    height: SCREEN_HEIGHT / 2,
    marginTop: 100,
    backgroundColor: commonColors.GREEN,
    borderRadius: 10
  },
  listContainer: {
    backgroundColor: "white",
    width: SCREEN_WIDTH / 6 * 5 - 40,
    height: SCREEN_HEIGHT / 2 - 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default ModalGooglePlaceSearch;
