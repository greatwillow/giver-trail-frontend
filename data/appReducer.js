'use strict';

import { combineReducers, createStore, applyMiddleware, compose } from 'redux'

import navReducer from './navigation/navReducer'


export default () => {

  const rootReducer = combineReducers({
    nav: navReducer
  })



  return createStore(rootReducer)
}
