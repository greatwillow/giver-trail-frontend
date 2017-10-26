import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  modalUserInfoInput: false,
  modalCitySearch: false,
  modalInterestSelector: false
};

const modalUI = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MODAL_USER_INFO_INPUT:
      return {
        ...state,
        modalUserInfoInput: action.visible
      };
    case actionTypes.MODAL_CITY_SEARCH:
      return {
        ...state,
        modalCitySearch: action.visible
      };
    case actionTypes.MODAL_INTEREST_SELECTOR:
      return {
        ...state,
        modalInterestSelector: action.visible
      };
    default:
      return state;
  }
};

export default modalUI;
