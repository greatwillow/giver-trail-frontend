import {
  postNewUserSignup,
  sendNewUserRegistrationData,
  getUserData,
  setUserToken,
  setUserID,
  setUserEmail,
  setUserFirstName,
  setUserLastName,
  setUserAge,
  setUserCity,
  addToUserPassionsList,
  removeFromUserPassionsList
} from "./user/actions";

import {
  modalUserInfoInput,
  modalCitySearch,
  modalInterestSelector
} from "./modalUI/actions";

import { setInsetTabUI } from "./insetTabUI/actions";

import {
  setRegistrationUI,
  setUserInfoInputFinished
} from "./registrationUI/actions";

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
  setUserFirstName,
  setUserLastName,
  setUserAge,
  setUserCity,
  addToUserPassionsList,
  removeFromUserPassionsList,
  setRegistrationUI,
  setUserInfoInputFinished
};
