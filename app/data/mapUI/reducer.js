import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  mapRegion: {
    latitude: 45.5,
    longitude: -73.6,
    latitudeDelta: 0.3,
    longitudeDelta: 0.3,
    test: "dog"
  }
}

const mapUI = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MAP_REGION:
      return {
        ...state,
          ...state.mapUI,
          mapRegion: {
            ...state.mapRegion,
            latitude: action.mapRegion.latitude,
            longitude: action.mapRegion.longitude,
            latitudeDelta: action.mapRegion.latitudeDelta,
            longitudeDelta: action.mapRegion.longitudeDelta,
            test: action.mapRegion.test
          }
        }
    default:
      return state;
};
}

export default mapUI;
