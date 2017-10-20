//--------------------------------POST-------------
fetchRequestPostTest() {
  console.log("pressed post");

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
//--------------------------------GET-------------
fetchRequestGetTest() {
  console.log("pressed get");

  return fetch(USER_GET_URI, {
    method: "GET"
  })
    .then(response => {
      console.log("response is: ", response);
      console.log("Is ok?: ", response.ok);
      console.log("Status?: ", response.status);
      //console.log("JSON?: ",response.json());
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
