import * as actionTypes from "../../constants/actionTypes";
import * as actions from "../appActions";

export function modalUserInfoInput(visible) {
  return {
    type: actionTypes.MODAL_USER_INFO_INPUT,
    visible
  };
}

export function modalCitySearch(visible) {
  return {
    type: actionTypes.MODAL_CITY_SEARCH,
    visible
  };
}

export function modalInterestSelector(visible) {
  return {
    type: actionTypes.MODAL_INTEREST_SELECTOR,
    visible
  };
}
