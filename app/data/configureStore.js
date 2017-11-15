"use strict";

import { createStore, applyMiddleware, compose } from "redux";
import defaultConfig from "redux-offline/lib/defaults";
import persist from "redux-offline/lib/defaults/persist";
//import logger from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { createNetworkMiddleware } from "react-native-offline";

import appReducer from "./appReducer";

const networkMiddleware = createNetworkMiddleware();

const store = createStore(
  appReducer,
  undefined,
  composeWithDevTools(applyMiddleware(networkMiddleware, thunk))
);

const persistOptions = {};
persist(store, persistOptions).purge();

export default store;
