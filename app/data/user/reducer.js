import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  userToken: null,
  userID: null,
  userEmail: null,
  userAge: null,
  userCity: null,
  userPassionsList: []
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_TOKEN:
      return setUserToken(state, action.userToken);
    case actionTypes.SET_USER_ID:
      return setUserID(state, action.userID);
    case actionTypes.SET_USER_EMAIL:
      return setUserEmail(state, action.userEmail);
    case actionTypes.SET_USER_AGE:
      return setUserAge(state, action.userAge);
    case actionTypes.SET_USER_CITY:
      return setUserCity(state, action.userCity);
    case actionTypes.SET_USER_PASSIONS_LIST:
      return setUserPassionsList(state, action.userPassionsList);
    case actionTypes.POST_NEW_USER_SIGNUP:
      console.log("USER SIGNING UP!");
      return postNewUserSignup(state, action);
    case actionTypes.NEW_USER_SIGNUP_SUCEEDED:
      console.log("USER SIGN Up SUCCESS!");
      return newUserSignupSuceeded(state, action);
    case actionTypes.NEW_USER_SIGNUP_FAILED:
      console.log("USER SIGN Up FAIL!");
      return newUserSignupFailed(state, action);
    default:
      return state;
  }
};

const postNewUserSignup = (state, action) => {
  return {
    ...state,
    submitting: { ...state.submitting, [action.payload.userEmail]: true }
  };
};

const newUserSignupSuceeded = (state, action) => {
  return {
    ...state,
    ...state.user,
    userEmail: action.payload.userEmail
    //userPassword: payload.userPassword
  };
};

const newUserSignupFailed = (state, action) => {
  return {
    ...state,
    ...state.user,
    userEmail: action.payload.userEmail
    //userPassword: payload.userPassword
  };
};

const setUserToken = (state, userToken) => {
  return {
    ...state,
    ...state.user,
    userToken: userToken
  };
};

const setUserID = (state, userID) => {
  return {
    ...state,
    ...state.user,
    userID: userID
  };
};

const setUserEmail = (state, userEmail) => {
  return {
    ...state,
    ...state.user,
    userEmail: userEmail
  };
};

const setUserAge = (state, userAge) => {
  return {
    ...state,
    ...state.user,
    userAge: userAge
  };
};

const setUserCity = (state, userCity) => {
  return {
    ...state,
    ...state.user,
    userCity: userCity
  };
};

const setUserPassionsList = (state, userPassionsList) => {
  return {
    ...state,
    ...state.user,
    userPassionsList: userPassionsList
  };
};

export default user;
