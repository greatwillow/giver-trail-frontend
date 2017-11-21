/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { withNetworkConnectivity } from "react-native-offline";

import AppNavReduxWrapper from "./app/navigation/AppNavReduxWrapper";
import configureStore from "./app/data/configureStore";

let Root = () => <AppNavReduxWrapper />;

Root = withNetworkConnectivity({
  withRedux: true, // It won't inject isConnected as a prop in this case
  checkConnectionInterval: 5000
})(Root);
class App extends Component<{}> {
  store = configureStore;
  render() {
    return (
      <Provider store={this.store}>
        <Root />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
