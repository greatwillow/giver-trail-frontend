import React, { Component } from 'react';

import GooglePlacesAutocomplete from "../../../../utils/GooglePlacesAutocomplete";
import { googlePlacesAutocompleteAPIKey } from "../../../../constants/apiKeys";
import GoogleGeocoding from "../../../../utils/GoogleGeocoding"
import { googleMapsGeocodingAPIKey } from "../../../../constants/apiKeys"

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/dimensions";
class GoogleAutocompleteSearch extends Component {


//--------------------------------------------------
// GEOCODING
//--------------------------------------------------

  _geocodeCity = (data, details) => {

    console.log('====================================');
    console.log("DATA IS ",data);
    console.log("DETAILS ARE ",details);
    console.log('====================================');
    
        GoogleGeocoding.setApiKey(googleMapsGeocodingAPIKey);
          GoogleGeocoding.getFromLocation(details.name).then(
            json => {


              const location = json.results[0].geometry.location;
              const formattedLocation = {
                latitude: location.lat,
                longitude: location.lng, 
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
              }
              this.props.setMapRegion(formattedLocation)
              // this._updateLocation(formattedLocation)
              // return formattedLocation;
              console.log('====================================');
              console.log("Location is ",location);
              console.log("formatted  ",formattedLocation);
              console.log('====================================');
            },
            error => {
              console.log("GEOCODING ERROR ",error);
            }
          ); 
      }

      
    render() {
        return (
            <GooglePlacesAutocomplete
            placeholder="Search for your City!"
            minLength={2}
            listViewDisplayed="auto"
            fetchDetails={true}
            renderDescription={row => row.description}
            onPress={(data, details) => {
              this._geocodeCity(data, details);
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
                position: 'absolute',
                top: 20,
                left: 20,
                right: 20,
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
        );
    }
}

export default GoogleAutocompleteSearch;