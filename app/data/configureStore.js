"use strict";

import { createStore, applyMiddleware, compose } from "redux";
import { offline } from "redux-offline";
import defaultConfig from "redux-offline/lib/defaults";
import persist from "redux-offline/lib/defaults/persist";
import logger from "redux-logger";
import thunk from "redux-thunk";

import appReducer from "./appReducer";

const offlineConfig = {
  ...defaultConfig,
  retry: (action, retries) => (action.meta.urgent ? 100 : 1000 * (retries + 1)),
  discard: (error, action, retries) => error.permanent || retries > 1
};

const store = createStore(
  appReducer,
  undefined,
  compose(applyMiddleware(thunk, logger), offline(offlineConfig))
);

const persistOptions = {};
persist(store, persistOptions).purge();

export default store;
