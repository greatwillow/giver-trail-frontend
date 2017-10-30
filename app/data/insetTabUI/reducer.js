import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  insetTabChosen: "userProfile"
};

const insetTabUI = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INSET_TAB_UI:
      return {
        ...state,
        insetTabChosen: action.chosenTab
      };
    default:
      return state;
  }
};

export default insetTabUI;
