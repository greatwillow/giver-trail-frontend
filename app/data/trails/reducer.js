import * as actionTypes from "../../constants/actionTypes";
import dotProp from "dot-prop-immutable";

const initialState = { trails: [] };

const trails = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TRAIL_TO_TRAILS:
            return {
                ...state,
                trails: state.trails.concat(action.trail)
            };
        case actionTypes.SET_TRAIL_CENTER_POINT:
            function addCenterPointToTrail(array, action) {
                const wantedIndex = array
                    .map(e => {
                        return e.id;
                    })
                    .indexOf(action.trail.id);
                return array.map((trail, index) => {
                    function centerPointToAdd(coordinates) {
                        console.log("IS A ONE POINTER=================");
                        if (coordinates.length <= 1) {
                            return coordinates[0] || [0, 0];
                        } else {
                            return coordinates[coordinates.length / 2];
                        }
                    }

                    if (index !== wantedIndex) {
                        return trail;
                    } else {
                        return {
                            ...trail,
                            centerPoint: centerPointToAdd(
                                action.trail.coordinates
                            )
                        };
                    }
                });
            }

            return {
                ...state,
                trails: addCenterPointToTrail(state.trails, action)
            };
        default:
            return state;
    }
};

export default trails;
