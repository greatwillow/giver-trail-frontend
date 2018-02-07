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
          [action.locationPoint.longitude, action.locationPoint.latitude]
        ])
      };
    default:
      return state;
  }
};

export default trail;
