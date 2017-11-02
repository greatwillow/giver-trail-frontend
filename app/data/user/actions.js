import { NetInfo } from "react-native";

import * as actionTypes from "../../constants/actionTypes";
import * as actions from "../appActions";

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

export function setUserPassionsList(userPassionsList) {
  return {
    type: actionTypes.SET_USER_PASSIONS_LIST,
    userPassionsList
  };
}

//--------------------------------------------------
//   ATTEMPT NEW USER SIGNUP REQUEST
//--------------------------------------------------

const attemptNewUserSignupPost = (userEmail, userPassword) => dispatch => {
  const email = userEmail.userEmail;
  const password = userPassword.userPassword;

  const USER = {
    email: email,
    password: password
  };

  const USER_POST_URI =
    "https://damp-tor-16286.herokuapp.com/users/create-user";

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
};

// export const postNewUserSignup = (userEmail, userPassword) => dispatch => {
//   NetInfo.isConnected.fetch().then(isConnected => {
//     if (isConnected) {
//       dispatch(attemptNewUserSignupPost(userEmail, userPassword));
//     } else {
//       console.log("OFFLINE____________");
//     }
//   });
// };

export const postNewUserSignup = userEmail => ({
  type: actionTypes.POST_NEW_USER_SIGNUP,
  payload: { userEmail },
  meta: {
    offline: {
      // the network action to execute:
      effect: {
        url: "https://damp-tor-16286.herokuapp.com/users/create-user",
        method: "POST",
        body: { userEmail }
      },
      // action to dispatch when effect succeeds:
      commit: {
        type: actionTypes.NEW_USER_SIGNUP_SUCEEDED,
        payload: { userEmail },
        meta: { userEmail }
      },
      // action to dispatch if network action fails permanently:
      rollback: {
        type: actionTypes.NEW_USER_SIGNUP_FAILED,
        payload: { userEmail },
        meta: { userEmail }
      }
    }
  }
});

//--------------------------------------------------
//   SEND NEW USER REGISTRATION DATA
//--------------------------------------------------

const attemptSendingNewUserRegistrationData = inputObject => (
  dispatch,
  getState
) => {
  const age = inputObject.userAge;
  const city = inputObject.userCity;
  const description = inputObject.userPassionsList;
  console.log("USER AGE", age);
  console.log("USER City", city);
  console.log("USER Description", description);
  console.log("USER", inputObject);

  const USER = {
    age: age,
    description: description
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
      dispatch(actions.setUserPassionsList(data.description));
    })
    .catch(error => {
      console.error(error);
    });
};

export const sendNewUserRegistrationData = inputObject => dispatch => {
  NetInfo.isConnected.fetch().then(isConnected => {
    if (isConnected) {
      dispatch(attemptSendingNewUserRegistrationData(inputObject));
    } else {
      console.log("OFFLINE____________");
    }
  });
};

//--------------------------------------------------
//   GET USER DATA
//--------------------------------------------------

const attemptGettingUserData = userID => (dispatch, getState) => {
  const USER_GET_URI = `https://damp-tor-16286.herokuapp.com/users/${userID}`;

  console.log("GET REQ UserID is ", userID);

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
        console.log("RESPONSE GOOD For GET Request ", res);
        return res.json();
      } else {
        console.log("RESPONSE BAD for GET Request", res);
        throw new Error("Something wrong with the server!");
      }
    })
    .then(data => {
      dispatch(actions.setUserAge(data.doc.age));
      dispatch(actions.setUserPassionsList(data.doc.description));
    })
    .catch(error => {
      console.error(error);
    });
};

export const getUserData = inputObject => dispatch => {
  NetInfo.isConnected.fetch().then(isConnected => {
    if (isConnected) {
      dispatch(attemptGettingUserData(inputObject));
    } else {
      console.log("OFFLINE____________");
    }
  });
};
