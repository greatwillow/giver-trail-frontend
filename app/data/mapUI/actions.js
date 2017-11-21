import * as actionTypes from "../../constants/actionTypes";
import * as actions from "../appActions";



export function setMapRegion(mapRegion) {
    return {
      type: actionTypes.SET_MAP_REGION,
      mapRegion: mapRegion
    };
}

export function setMapZoom(mapZoom) {
  return {
    type: actionTypes.SET_MAP_ZOOM,
    mapZoom: mapZoom
  }
}

