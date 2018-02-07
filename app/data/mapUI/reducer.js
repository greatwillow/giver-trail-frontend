import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  mapZoom: 8,
  mapFollowMode: false,
  mapRegion: {
    latitude: 37.453184, //45.5
    longitude: 122.209361, //-73.6
    latitudeDelta: 0.3,
    longitudeDelta: 0.3
  },
  trackingStatus: false
};

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
          longitudeDelta: action.mapRegion.longitudeDelta
        }
      };
    case actionTypes.SET_MAP_ZOOM:
      return {
        ...state,
        ...state.mapUI,
        mapZoom: action.mapZoom
      };
    case actionTypes.SET_MAP_FOLLOW_MODE:
      return {
        ...state,
        ...state.mapUI,
        mapFollowMode: action.mapFollowMode
      };
    case actionTypes.TOGGLE_TRACKING_STATUS:
      return {
        ...state,
        ...state.trail,
        trackingStatus: action.trackingStatus
      };
    default:
      return state;
  }
};

export default mapUI;
