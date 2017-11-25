import {
  postNewUserSignup,
  attemptUserSignIn,
  sendNewUserRegistrationData,
  getUserData,
  setUserToken,
  setUserID,
  setUserEmail,
  setUserFirstName,
  setUserLastName,
  setUserAge,
  setUserCity,
  setUserPassionsList,
  addToUserPassionsList,
  removeFromUserPassionsList,
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

import {
  generateNewTrail,
  addLocationPointToTrail,
  toggleTrackingStatus
} from "./trail/actions"

import {
  addTrailToTrails,
} from "./trails/actions"

export {
  //modalUI
  modalUserInfoInput,
  modalCitySearch,
  modalInterestSelector,
  //insetTabUI
  setInsetTabUI,
  //user
  postNewUserSignup,
  attemptUserSignIn,
  sendNewUserRegistrationData,
  getUserData,
  setUserToken,
  setUserID,
  setUserEmail,
  setUserFirstName,
  setUserLastName,
  setUserAge,
  setUserCity,
  setUserPassionsList,
  addToUserPassionsList,
  removeFromUserPassionsList,
  //registrationUI
  setRegistrationUI,
  setUserInfoInputFinished,
  //mapUI
  setMapRegion,
  setMapZoom,
  //trail
  generateNewTrail,
  addLocationPointToTrail,
  toggleTrackingStatus,
  //trails
  addTrailToTrails,
};
