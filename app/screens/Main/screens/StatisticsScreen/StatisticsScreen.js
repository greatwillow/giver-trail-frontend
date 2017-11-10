"use strict";

import React, { Component } from "react";

import { SCREEN_WIDTH } from "../../../../constants/dimensions";

import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

class SignupScreen extends Component {
  _getTrailApiData = () => {
    const TRAIL_API_URI =
      "https://trailapi-trailapi.p.mashape.com/?[country_cont]=Canada";
    const TRAIL_API_KEY = "1VNvyLuttomsh8vcHqMsnAURtqmQp1bW0chjsnQ4Dafxx4qCHN";

    console.log("GOING TO FETCH!");

    fetch(TRAIL_API_URI, {
      headers: new Headers({
        Accept: "text/plain",
        "X-Mashape-Key": TRAIL_API_KEY
      })
    })
      .then(res => {
        if (res.status == 200) {
          console.log("RESPONSE GOOD For GET Request ", res);
          console.log("RESPONSE BODY IS ", res.body);
          return res.json();
        } else {
          console.log("RESPONSE BAD for GET Request", res);
          throw new Error("Something wrong with the server!");
        }
      })
      .then(data => {
        //dispatch(actions.setUserAge(data.doc.age));
        //dispatch(actions.addToUserPassionsList(data.doc.description));
        console.log("DATA IS ", data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <View style={styles.layoutStyle}>
        <Text style={styles.textStyle}>Statistics!</Text>
        <TouchableHighlight
          onPress={() => this._getTrailApiData()}
          style={{ width: 300, height: 100, backgroundColor: "blue" }}
          underlayColor="green"
        >
          <Text>Go to User Registration!</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layoutStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH
  },
  textStyle: {
    fontSize: 30,
    color: "red"
  }
});

export default SignupScreen;
