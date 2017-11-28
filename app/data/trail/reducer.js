import * as actionTypes from "../../constants/actionTypes";
import shortid from 'shortid';

const initialState = {
    id: null,
    name: null,
    trackingStatus: false,
    coordinates: []
}

const trail = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GENERATE_NEW_TRAIL:
            return {
                ...state,
                    id: shortid.generate(),
                    name: "No Name Trail",
                    trackingStatus: false,
                    coordinates: []
            }
        case actionTypes.ADD_LOCATION_POINT_TO_TRAIL:
            return {
                ...state, 
                ...state.trail,
                    coordinates: state.coordinates.concat([
                        [
                        action.locationPoint.longitude,
                        action.locationPoint.latitude
                        ]
                    ])
            }
        case actionTypes.TOGGLE_TRACKING_STATUS:
            return {
                ...state,
                ...state.trail,
                    trackingStatus: action.trackingStatus
            }
        default:
            return state;
    }
}

export default trail;