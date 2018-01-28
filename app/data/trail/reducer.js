import * as actionTypes from "../../constants/actionTypes";
import shortid from "shortid";

const initialState = {
    id: null, //shortid.generate(),
    name: "Initial Trail",
    coordinates: [],
    centerPoint: []
};

const trail = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GENERATE_NEW_TRAIL:
            return {
                ...state,
                id: shortid.generate(),
                name: "Generated Trail",
                coordinates: []
            };
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
            };

        // case actionTypes.SET_TRAIL_CENTER_POINT:
        //     const determinedCenterPoint =
        //         action.trail.coordinates[
        //             parseInt(action.trail.coordinates.length / 2)
        //         ];

        //     return {
        //         ...state,
        //         ...state.trail,
        //         centerPoint: determinedCenterPoint
        //     };
        default:
            return state;
    }
};

export default trail;
