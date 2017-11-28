import * as actionTypes from "../../constants/actionTypes";
import dotProp  from 'dot-prop-immutable'

const initialState = {trails: []}

const trails = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_TRAIL_TO_TRAILS:
            return  {
                ...state,
                trails: state.trails.concat(action.trail)
            }          
        default:
            return state;
    }
}

export default trails;