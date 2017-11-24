import * as actionTypes from "../../constants/actionTypes";

const initialState = {
    id: null,
    coordinates: []
}

const trail = (state = initialState, action) => {
    switch(action.type) {
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
        default:
            return state;
    }
}

export default trail;