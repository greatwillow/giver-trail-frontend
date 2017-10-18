"use strict";

import { combineReducers } from "redux";
import navReducer from "./navigation/reducer";
import userReducer from "./users/reducer";

const appReducer = combineReducers({
  nav: navReducer,
  user: userReducer
});

export default appReducer;
