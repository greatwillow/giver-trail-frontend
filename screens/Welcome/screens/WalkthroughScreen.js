import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  Dimensions
} from "react-native";
import { SCREEN_WIDTH } from "../../../styles/dimensions";

const WALKTHROUGH_DATA = [
  { text: "Welcome hello to the Givertrail Project", color: "#03A9F4" },
  { text: "Where every step makes the World Better", color: "#009688" },
  { text: "Sign Up now and Make a Difference", color: "#03A9F4" }
];

class WalkthroughScreen extends Component {
  renderLastWalkthroughScreen(index) {
    if (index === WALKTHROUGH_DATA.length - 1) {
      return (
        <View>
          <TouchableHighlight
            onPress={() => {
              this.props.navigation.navigate("signup");
            }}
            style={{ width: 300, height: 100, backgroundColor: "blue" }}
            underlayColor="green"
          >
            <Text>Go to Sign Up!</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              this.props.navigation.navigate("login");
            }}
            style={{ width: 300, height: 100, backgroundColor: "blue" }}
            underlayColor="green"
          >
            <Text>Go to Login!</Text>
          </TouchableHighlight>
        </View>
      );
    }
  }
  //--------------------------------POST-------------
  fetchRequestPostTest() {
    console.log("pressed post");

    const TEST_USER = {
      email: "gradfasdy@gmail.com",
      password: "12345678"
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

  renderWalkthrough() {
    return WALKTHROUGH_DATA.map((page, index) => {
      return (
        <View
          key={page.text}
          style={[styles.layoutStyle, { backgroundColor: page.color }]}
        >
          <TouchableHighlight
            onPress={() => {
              this.fetchRequestPostTest();
            }}
            style={{ width: 200, height: 60, backgroundColor: "red" }}
            underlayColor="blue"
          >
            <Text>Fetch</Text>
          </TouchableHighlight>
          <Text style={styles.textStyle}>{page.text}</Text>
          {this.renderLastWalkthroughScreen(index)}
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView horizontal style={{ flex: 1 }} pagingEnabled>
        {this.renderWalkthrough()}
      </ScrollView>
    );
  }
}

const styles = {
  layoutStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH
  },
  textStyle: {
    fontSize: 30,
    color: "white"
  }
};

export default WalkthroughScreen;
