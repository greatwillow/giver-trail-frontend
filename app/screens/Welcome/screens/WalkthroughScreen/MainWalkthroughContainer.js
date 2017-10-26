"use strict";

import React, { Component } from "react";

import {
  Image,
  Platform,
  StyleSheet,
  StatusBar,
  Text,
  View
} from "react-native";

import { SCREEN_WIDTH } from "../../../../constants/dimensions";

class MainWalkthroughContainer extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={this.props.backgroundImageFile}
          style={styles.backgroundImage}
        >
          <View style={styles.statusBar}>
            <StatusBar
              backgroundColor={"transparent"}
              translucent
              hidden={true}
            />
          </View>
          {this.props.children}
        </Image>
      </View>
    );
  }
}

const styles = {
  backgroundImage: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: null,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center"
  },
  statusBar: {
    height: Platform.OS === "ios" ? 20 : StatusBar.currentHeight,
    backgroundColor: "rgba(0,0,0,0)",
    width: SCREEN_WIDTH
  }
};

export default MainWalkthroughContainer;
