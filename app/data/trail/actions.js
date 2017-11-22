import * as actionTypes from "../../constants/actionTypes"
import * as actions from '../appActions';

export function addLocationPointToTrail(locationPoint) {
    return {
        type: actionTypes.ADD_LOCATION_POINT_TO_TRAIL,
        locationPoint
    }
}
