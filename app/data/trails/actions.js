import * as actionTypes from "../../constants/actionTypes";
import * as actions from "../appActions";

export function addTrailToTrails(trail) {
    return {
        type: actionTypes.ADD_TRAIL_TO_TRAILS,
        trail
    };
}

export function setTrailCenterPoint(trail) {
    return {
        type: actionTypes.SET_TRAIL_CENTER_POINT,
        trail
    };
}
