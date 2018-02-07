import * as actionTypes from "../../constants/actionTypes";
import * as actions from "../appActions";

export function setMapRegion(mapRegion) {
  return {
    type: actionTypes.SET_MAP_REGION,
    mapRegion
  };
}

export function setMapZoom(mapZoom) {
  return {
    type: actionTypes.SET_MAP_ZOOM,
    mapZoom
  };
}

export function setMapFollowMode(mapFollowMode) {
  return {
    type: actionTypes.SET_MAP_FOLLOW_MODE,
    mapFollowMode
  };
}

export function toggleTrackingStatus(trackingStatus) {
  return {
    type: actionTypes.TOGGLE_TRACKING_STATUS,
    trackingStatus
  };
}
