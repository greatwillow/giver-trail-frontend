import * as actionTypes from "../../constants/actionTypes";



function postNewUser(userEmail, userPassword) {
  const email = userEmail.userEmail;
  const password = userPassword.userPassword;

  const TEST_USER = {
    email: email,
    password: password
  };

  const USER_POST_URI =
    "https://damp-tor-16286.herokuapp.com/users/create-user";
  const USER_GET_URI = "https://damp-tor-16286.herokuapp.com/users/:id";

  return fetch(USER_POST_URI, {
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    }),
    method: "POST",
    body: JSON.stringify(TEST_USER)
  })
    .then(res => {
      if (res.status == 200) {
        const XAUTH_TOKEN = res.headers.map['x-auth'][0]
        return console.log("RESPONSE", XAUTH_TOKEN, res);
      } else {
        throw new Error("Something wrong with the server!");
      }
    })
    .then(data => {
      console.log("data is: ", data);
    })
    .catch(error => {
      console.error(error);
    });
}

export const userSignup = (userEmail, userPassword) => dispatch => {
  postNewUser(userEmail, userPassword);
};
