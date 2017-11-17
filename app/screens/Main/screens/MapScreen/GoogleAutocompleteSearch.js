import React, { Component } from 'react';

import GooglePlacesAutocomplete from "../../../../utils/GooglePlacesAutocomplete";
import { googlePlacesAutocompleteAPIKey } from "../../../../constants/apiKeys";
class GoogleAutocompleteSearch extends Component {


//--------------------------------------------------
// GEOCODING
//--------------------------------------------------

  _geocodeCity = (data, details) => {
    
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
              this._updateLocation(formattedLocation)
              return formattedLocation;
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
            onPress={(data, details = null) => {
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