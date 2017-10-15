'use strict';

import AppNavigation from '../../navigation/AppNavigation';

const navReducer = (state, action) => {
  const newState = AppNavigation.router.getStateForAction(action, state)
  return newState || action;
}

export default navReducer;
