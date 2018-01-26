import * as actionTypes from "../../constants/actionTypes";
import * as actions from "../appActions";

export function generateNewTrail() {
    return {
        type: actionTypes.GENERATE_NEW_TRAIL
    };
}

export function addLocationPointToTrail(locationPoint) {
    return {
        type: actionTypes.ADD_LOCATION_POINT_TO_TRAIL,
        locationPoint
    };
}

export function toggleTrackingStatus(trackingStatus) {
    return {
        type: actionTypes.TOGGLE_TRACKING_STATUS,
        trackingStatus
    };
}

export function setTrailCenterPoint(trail) {
    return {
        type: actionTypes.SET_TRAIL_CENTER_POINT,
        trail
    };
}
