import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  chosenRegPage: "userInfoInput",
  userInfoInputIsFinished: false
};

const registrationUI = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_REGISTRATION_UI:
      return {
        ...state,
        chosenRegPage: action.chosenRegPage
      };
    case actionTypes.SET_USER_INFO_INPUT_FINISHED:
      return {
        ...state,
        userInfoInputIsFinished: action.userInfoInputIsFinished
      };
    default:
      return state;
  }
};

export default registrationUI;
