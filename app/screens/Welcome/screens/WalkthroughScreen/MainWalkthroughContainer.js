"use strict";

import React, { Component } from "react";

import {
  ImageBackground,
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
      <ImageBackground
          source={this.props.backgroundImageFile}
          style={styles.backgroundImage}>
          <View style={styles.statusBar}>
            <StatusBar
              backgroundColor={"transparent"}
              translucent
              hidden={true}
            />
          </View>
          {this.props.children}
          </ImageBackground>
      </View>
    );
  }
}

const styles = {
  backgroundImage: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: null,
    justifyContent: "center",
    alignItems: "center"
  },
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 20, //Platform.OS === "ios" ? 20 : StatusBar.currentHeight,
    backgroundColor: "rgba(0,0,0,0)",
    width: SCREEN_WIDTH
  }
};

export default MainWalkthroughContainer;
