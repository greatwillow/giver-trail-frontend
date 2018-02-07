"use strict";

import React, { Component } from "react";

import { Image, Modal, StyleSheet, Text, View } from "react-native";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/dimensions";
import commonColors from "../../../../constants/colors";

//-------------GOOGLE PLACES
//import GooglePlacesCityFind from "./GooglePlacesCityFind";
//import GooglePlacesAutocomplete from "../../../../utils/GooglePlacesAutocomplete";
import GoogleAutocompleteSearch from "../../../../screens/Main/screens/MapScreen/GoogleAutocompleteSearch";

//import { googlePlacesAutocompleteAPIKey } from "../../../../constants/apiKeys";

//--------------

class PopInCitySearch extends Component {
    _onPressSetCity = (data, details) => {
        const userCity = {
            name: details.name,
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng
        };
        this.props.setUserCity(userCity);
    };

    render() {
        return (
            <View style={[styles.movingContainer, this.props.style]}>
                <View style={styles.innerTopContainer}>
                    <View style={styles.listContainer}>
                        <GoogleAutocompleteSearch
                            {...this.props}
                            explicitSetMapRegion={region =>
                                this.props.explicitSetMapRegion(region)
                            }
                            onSubmitEditing={this.props.onSubmitEditing}
                        />
                    </View>
                </View>
                <View style={styles.innerBottomContainer} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    movingContainer: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        flex: 0,
        width: SCREEN_WIDTH / 6 * 5,
        height: SCREEN_HEIGHT / 8 * 5,
        backgroundColor: "rgba(0,0,0,0)"
    },
    innerTopContainer: {
        flex: 9,
        width: SCREEN_WIDTH / 6 * 5,
        borderColor: commonColors.GREEN,
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: "rgba(0,0,0,0)",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        paddingBottom: 15
    },
    innerBottomContainer: {
        flex: 11,
        width: SCREEN_WIDTH / 6 * 5,
        backgroundColor: "rgba(0,0,0,0)"
    },
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
        alignItems: "center",
        justifyContent: "center"
    }
});

export default PopInCitySearch;
