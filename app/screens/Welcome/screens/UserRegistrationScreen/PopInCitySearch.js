"use strict";

import React, { Component } from "react";

import {
  Image,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  View
} from "react-native";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/dimensions";
import commonColors from "../../../../constants/colors";

//-------------GOOGLE PLACES
import GooglePlacesAutocomplete from "../../../../utils/GooglePlacesAutocomplete";
import { googlePlacesAutocompleteAPIKey } from "../../../../constants/apiKeys";

//--------------

class PopInCitySearch extends Component {
  _onPressGetCity = (data, details) => {
    this.props.setUserCity(details.name);
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <View style={[styles.innerContainer, this.props.style]}>
          <View style={styles.listContainer}>
            <GooglePlacesAutocomplete
              placeholder="Search for your City!"
              minLength={2}
              listViewDisplayed="auto"
              fetchDetails={true}
              renderDescription={row => row.description}
              onPress={(data, details = null) => {
                this._onPressGetCity(data, details);
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
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: SCREEN_WIDTH / 6 * 5,
    height: SCREEN_HEIGHT / 8 * 5,
    backgroundColor: "rgba(0,0,0,0)",
    borderColor: commonColors.GREEN,
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 30
  },
  listContainer: {
    borderRadius: 10,
    margin: 15,
    marginBottom: 60,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default PopInCitySearch;
