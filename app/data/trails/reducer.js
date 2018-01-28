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
            console.log("INSIDE CENTER POINT REDUCER ===================");
            function addCenterPointToTrail(array, action) {
                const wantedIndex = array
                    .map(e => {
                        console.log("INSIDE MAP FOR INDEX ", e, " AND ", e.id);
                        return e.id;
                    })
                    .indexOf(action.trail.id);

                console.log("WANTED INDEX ", wantedIndex);
                console.log("Action.trail.id ", action.trail.id);

                return array.map((trail, index) => {
                    if (index !== wantedIndex) {
                        console.log(
                            "INSIDE2222 MAP FOR INDEX ",
                            trail,
                            " AND ",
                            index
                        );
                        return trail;
                    }
                    console.log(
                        "WHATS RETURNED ",
                        action.trail.coordinates[
                            parseInt(action.trail.coordinates.length / 2)
                        ]
                    );
                    return {
                        ...trail,
                        centerPoint:
                            action.trail.coordinates[
                                parseInt(action.trail.coordinates.length / 2)
                            ]
                    };
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
