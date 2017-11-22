import * as actionTypes from "../../constants/actionTypes";

const initialState = {
    id: null,
    geometry: []
}

const trail = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_LOCATION_POINT_TO_TRAIL:
            return {
                ...state, 
                ...state.trail,
                    geometry: state.geometry.concat({
                        latitude: action.locationPoint.latitude,
                        longitude: action.locationPoint.longitude
                    })
            }
        default:
            return state;
    }
}

export default trail;