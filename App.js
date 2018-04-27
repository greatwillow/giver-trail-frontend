import React, { Component } from "react";
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

export default App;
