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

import {
  setMapRegion,
  setMapZoom,
} from "./mapUI/actions";

export {
  //modalUI
  modalUserInfoInput,
  modalCitySearch,
  modalInterestSelector,
  //insetTabUI
  setInsetTabUI,
  //user
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
  //registrationUI
  setRegistrationUI,
  setUserInfoInputFinished,
  //mapUI
  setMapRegion,
  setMapZoom
};
