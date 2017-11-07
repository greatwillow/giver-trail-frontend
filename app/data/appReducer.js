"use strict";

import { combineReducers } from "redux";
import navReducer from "./navigation/reducer";
//import session from "./session/reducer";
import user from "./user/reducer";
import modalUI from "./modalUI/reducer";
import insetTabUI from "./insetTabUI/reducer";
import registrationUI from "./registrationUI/reducer";
import { reducer as network } from "react-native-offline";

const appReducer = combineReducers({
  nav: navReducer,
  //session: session,
  user: user,
  modalUI: modalUI,
  insetTabUI: insetTabUI,
  registrationUI,
  network: network
});

export default appReducer;
