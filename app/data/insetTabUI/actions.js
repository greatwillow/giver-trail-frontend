import * as actionTypes from "../../constants/actionTypes";
import * as actions from "../appActions";

export function setInsetTabUI(chosenTab) {
  return {
    type: actionTypes.SET_INSET_TAB_UI,
    chosenTab
  };
}
