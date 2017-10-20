import * as actionTypes from "../../constants/actionTypes";

function postNewUser(userEmail, userPassword) {
  // console.log("pressed post");
  // console.log("type of email is: ", typeof userEmail);
  // console.log("type of email is: ", typeof userEmail.toString());
  // console.log("type of pass is: ", typeof userPassword);
  // console.log("type of pass is: ", typeof userPassword.toString());

  const TEST_USER = {
    email: userEmail.toString(),
    password: userPassword.toString(),
    pointsEarned: 7484
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
      console.log("response is: ", res);
      console.log(res.status);
      console.log(res.statusText);
      if (res.status == 200) {
        return res.json();
      } else {
        console.log(res.text());
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
