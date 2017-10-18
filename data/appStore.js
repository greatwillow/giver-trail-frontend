"use strict";

import { createStore, applyMiddleware, compose } from "redux";
import { offline } from "redux-offline";
import defaultConfig from "redux-offline/lib/defaults";
import persist from "redux-offline/lib/defaults/persist";
import logger from "redux-logger";

import appReducer from "./appReducer";

const offlineConfig = {
  ...defaultConfig
};

const store = createStore(
  appReducer,
  undefined,
  compose(applyMiddleware(logger), offline(offlineConfig))
);

const persistOptions = {};
persist(store, persistOptions).purge();

export default store;
