import { NetInfo } from "react-native";

import * as actionTypes from "../../constants/actionTypes";
import * as actions from "../appActions";
import { NavigationActions } from "react-navigation";

//--------------------------------------------------
//   SET USER DATA
//--------------------------------------------------

export function setUserToken(userToken) {
  return {
    type: actionTypes.SET_USER_TOKEN,
    userToken
  };
}

export function setUserID(userID) {
  return {
    type: actionTypes.SET_USER_ID,
    userID
  };
}

export function setUserEmail(userEmail) {
  return {
    type: actionTypes.SET_USER_EMAIL,
    userEmail
  };
}

export function setUserFirstName(userFirstName) {
  return {
    type: actionTypes.SET_USER_FIRST_NAME,
    userFirstName
  };
}

export function setUserLastName(userLastName) {
  return {
    type: actionTypes.SET_USER_LAST_NAME,
    userLastName
  };
}

export function setUserAge(userAge) {
  return {
    type: actionTypes.SET_USER_AGE,
    userAge
  };
}

export function setUserCity(userCity) {
  return {
    type: actionTypes.SET_USER_CITY,
    userCity
  };
}

export function setUserPassionsList(list) {
  return {
    type: actionTypes.SET_USER_PASSIONS_LIST,
    list
  };
}

export function addToUserPassionsList(passionItem) {
  return {
    type: actionTypes.ADD_TO_USER_PASSIONS_LIST,
    passionItem
  };
}

export function removeFromUserPassionsList(passionItem) {
  return {
    type: actionTypes.REMOVE_FROM_USER_PASSIONS_LIST,
    passionItem
  };
}

//--------------------------------------------------
//   ATTEMPT NEW USER SIGNUP REQUEST
//--------------------------------------------------

const attemptNewUserSignupPost = (userEmail, userPassword) => {
  function thunk(dispatch) {
    const email = userEmail.userEmail;
    const password = userPassword.userPassword;

    const USER = {
      email: email,
      password: password
    };

    const USER_POST_URI =
      "https://damp-tor-16286.herokuapp.com/users/create-user";

    fetch(USER_POST_URI, {
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      }),
      method: "POST",
      body: JSON.stringify(USER)
    })
      .then(res => {
        if (res.status == 200) {
          const XAUTH_TOKEN = res.headers.map["x-auth"][0];
          dispatch(actions.setUserToken(XAUTH_TOKEN));
          return res.json();
        } else {
          throw new Error("Something wrong with the server!");
        }
      })
      .then(data => {
        dispatch(actions.setUserID(data._id));
        dispatch(actions.setUserEmail(data.email));
      })
      .catch(error => {
        console.error(error);
      });
  }
  thunk.interceptInOffline = true;
  thunk.meta = { retry: true };
  return thunk;
};

export const postNewUserSignup = (userEmail, userPassword) => dispatch => {
  dispatch(attemptNewUserSignupPost(userEmail, userPassword));
};

//--------------------------------------------------
//   SEND NEW USER REGISTRATION DATA
//--------------------------------------------------

const attemptSendingNewUserRegistrationData = inputObject => (
  dispatch,
  getState
) => {
  const age = inputObject.userAge;
  const city = inputObject.userCity;

  const USER = {
    age: age
  };

  const USER_PUT_URI =
    "https://damp-tor-16286.herokuapp.com/users/update-profile";

  const STATE = getState();
  const USER_TOKEN = STATE.user.userToken;

  return fetch(USER_PUT_URI, {
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth": USER_TOKEN
    }),
    method: "PUT",
    body: JSON.stringify(USER)
  })
    .then(res => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error("Something wrong with the server!");
      }
    })
    .then(data => {
      dispatch(actions.setUserAge(data.age));
      dispatch(actions.addToUserPassionsList(data.description));
    })
    .catch(error => {
      console.error(error);
    });
};

export const sendNewUserRegistrationData = inputObject => dispatch => {
  dispatch(attemptSendingNewUserRegistrationData(inputObject));
};

//--------------------------------------------------
//   GET USER DATA
//--------------------------------------------------

const attemptGettingUserData = userID => (dispatch, getState) => {
  const USER_GET_URI = `https://damp-tor-16286.herokuapp.com/users/${userID}`;

  const STATE = getState();
  const USER_TOKEN = STATE.user.userToken;

  return fetch(USER_GET_URI, {
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth": USER_TOKEN
    })
  })
    .then(res => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error("Something wrong with the server!");
      }
    })
    .then(data => {
      dispatch(actions.setUserAge(data.doc.age));
      dispatch(actions.addToUserPassionsList(data.doc.description));
    })
    .catch(error => {
      console.error(error);
    });
};

export const getUserData = inputObject => dispatch => {
  dispatch(attemptGettingUserData(inputObject));
};

//--------------------------------------------------
// ATTEMPT USER SIGN IN
//--------------------------------------------------

export const attemptUserSignIn = (userEmail, userPassword) => (
  dispatch,
  getState
) => {
  const USER = {
    email: userEmail.userEmail,
    password: userPassword.userPassword
  };

  const USER_POST_URI = "https://damp-tor-16286.herokuapp.com/users/login";

  return fetch(USER_POST_URI, {
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    }),
    method: "POST",
    body: JSON.stringify(USER)
  })
    .then(res => {
      if (res.status == 200) {
        dispatch(actions.setUserToken(res.headers.map["x-auth"][0]));

        return res.json();
      } else {
        throw new Error("Something wrong with the server! Response is: ", res);
      }
    })
    .then(data => {

      dispatch(actions.setUserEmail(data.email));
      dispatch(actions.setUserAge(data.age));
      dispatch(actions.setUserPassionsList(data.interestList));

      //TODO: Get Abdalla to modify user city data - add lat,long,name params
      //dispatch(actions.setUserCity(data.address.city))

      dispatch(NavigationActions.navigate({ routeName: "mainInsetNavStack" }));
    })
    .catch(error => {
      dispatch(NavigationActions.navigate({ routeName: "signInFail" }));
    });
};
