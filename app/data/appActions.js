import {
  postNewUserSignup,
  sendNewUserRegistrationData,
  getUserData,
  setUserToken,
  setUserID,
  setUserEmail,
  setUserAge,
  setUserCity,
  setUserPassionsList
} from "./user/actions";

import {
  modalUserInfoInput,
  modalCitySearch,
  modalInterestSelector
} from "./modalUI/actions";

import { setInsetTabUI } from "./insetTabUI/actions";

export {
  modalUserInfoInput,
  modalCitySearch,
  modalInterestSelector,
  setInsetTabUI,
  postNewUserSignup,
  sendNewUserRegistrationData,
  getUserData,
  setUserToken,
  setUserID,
  setUserEmail,
  setUserAge,
  setUserCity,
  setUserPassionsList
};
