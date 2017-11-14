"use strict";

import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { withNetworkConnectivity } from "react-native-offline";

import Expo from "expo";

import AppNavReduxWrapper from "./app/navigation/AppNavReduxWrapper";
import configureStore from "./app/data/configureStore";

let Root = () => <AppNavReduxWrapper />;

Root = withNetworkConnectivity({
  withRedux: false, // It won't inject isConnected as a prop in this case
  checkConnectionInterval: 1000
})(Root);

class App extends Component {
  store = configureStore;

  render() {
    return (
      <Provider store={this.store}>
        <Root />
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

Expo.registerRootComponent(App);
