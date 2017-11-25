import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  userToken: null,
  userID: null,
  userEmail: "gregory.g.denys@gmail.com",
  userFirstName: "Gregory",
  userLastName: "Denys",
  userAge: null,
  userCity: {name: "Montreal", latitude: 45.5, longitude: -73.6},
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
    case actionTypes.SET_USER_FIRST_NAME:
      return setUserFirstName(state, action.userFirstName);
    case actionTypes.SET_USER_LAST_NAME:
      return setUserLastName(state, action.userLastName);
    case actionTypes.SET_USER_AGE:
      return setUserAge(state, action.userAge);
    case actionTypes.SET_USER_CITY:
      return setUserCity(state, action.userCity);
    case actionTypes.ADD_TO_USER_PASSIONS_LIST:
      return addToUserPassionsList(state, action.passionItem);
    case actionTypes.SET_USER_PASSIONS_LIST:
      return setUserPassionsList(state, action.list);
    case actionTypes.REMOVE_FROM_USER_PASSIONS_LIST:
      return removeFromUserPassionsList(state, action.passionItem);
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
    ...state
  };
};

const newUserSignupSuceeded = (state, action) => {
  return {
    ...state,
    ...state.user,
    userEmail: action.payload.userEmail
    //userPassword: action.payload.userPassword
  };
};

const newUserSignupFailed = (state, action) => {
  return {
    ...state,
    ...state.user,
    userEmail: action.payload.userEmail
    //userPassword: action.payload.userPassword
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

const setUserFirstName = (state, userFirstName) => {
  return {
    ...state,
    ...state.user,
    userFirstName: userFirstName
  };
};

const setUserLastName = (state, userLastName) => {
  return {
    ...state,
    ...state.user,
    userLastName: userLastName
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
    userCity: {
      name: userCity.name,
      latitude: userCity.latitude,
      longitude: userCity.longitude
    }
  };
};

const setUserPassionsList = (state, list) => {
  return {
    ...state,
    userPassionsList: list
  }
}

const addToUserPassionsList = (state, passionItem) => {
  return {
    ...state,
    userPassionsList: [...state.userPassionsList, passionItem]
  };
};

const removeFromUserPassionsList = (state, passionItem) => {
  return {
    ...state,
    userPassionsList: [
      ...state.userPassionsList.slice(
        0,
        state.userPassionsList.indexOf(passionItem)
      ),
      ...state.userPassionsList.slice(
        state.userPassionsList.indexOf(passionItem) + 1
      )
    ]
  };
};

export default user;
