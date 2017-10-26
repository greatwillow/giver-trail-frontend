"use strict";

import { combineReducers } from "redux";
import navReducer from "./navigation/reducer";
//import session from "./session/reducer";
import user from "./user/reducer";
import modalUI from "./modalUI/reducer";

const appReducer = combineReducers({
  nav: navReducer,
  //session: session,
  user: user,
  modalUI: modalUI
});

export default appReducer;
