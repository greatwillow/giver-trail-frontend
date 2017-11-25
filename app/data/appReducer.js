"use strict";

import { combineReducers } from "redux";
import navReducer from "./navigation/reducer";
//import session from "./session/reducer";
import user from "./user/reducer";
import modalUI from "./modalUI/reducer";
import insetTabUI from "./insetTabUI/reducer";
import registrationUI from "./registrationUI/reducer";
import mapUI from "./mapUI/reducer";
import trail from "./trail/reducer";
import trails from "./trails/reducer";

import { reducer as network } from "react-native-offline";

const appReducer = combineReducers({
  nav: navReducer,
  //session: session,
  user: user,
  modalUI: modalUI,
  insetTabUI: insetTabUI,
  registrationUI,
  network: network,
  mapUI: mapUI,
  trail: trail,
  trails: trails
});

export default appReducer;
