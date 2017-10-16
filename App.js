"use strict";

import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";

import AppNavReduxWrapper from "./navigation/AppNavReduxWrapper";
import appReducer from "./data/appReducer";

class App extends Component {
  store = appReducer();

  render() {
    return (
      <Provider store={this.store}>
        <AppNavReduxWrapper />
      </Provider>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
