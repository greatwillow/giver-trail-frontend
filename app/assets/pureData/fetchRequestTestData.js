//--------------------------------POST-------------
fetchRequestPostTest() {

  const TEST_USER = {
    email: "fasdy@gmail.com",
    password: "12345678",
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
      if (res.status == 200) {
        return res.json();
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
//--------------------------------GET-------------
fetchRequestGetTest() {
  return fetch(USER_GET_URI, {
    method: "GET"
  })
    .then(response => {
      if (response.status == 200) return response.json();
      else throw new Error("Something wrong with the server!");
    })
    .then(data => {
      console.log("data is: ", data);
    })
    .catch(error => {
      console.error(error);
    });
}
