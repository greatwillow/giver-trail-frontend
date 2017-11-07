import * as actionTypes from "../../constants/actionTypes";
import * as actions from "../appActions";

//--------------------------------------------------
//
//--------------------------------------------------

export function setRegistrationUI(chosenRegPage) {
  return {
    type: actionTypes.SET_REGISTRATION_UI,
    chosenRegPage
  };
}

export function setUserInfoInputFinished(userInfoInputIsFinished) {
  return {
    type: actionTypes.SET_USER_INFO_INPUT_FINISHED,
    userInfoInputIsFinished
  };
}
