"use strict";

import { combineReducers } from "redux";
import navReducer from "./navigation/reducer";
import session from "./session/reducer";

const appReducer = combineReducers({
  nav: navReducer,
  user: session
});

export default appReducer;
