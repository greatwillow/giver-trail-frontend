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
import { Font } from "expo";

class MainWalkthroughContainer extends Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      "titillium-light": require("../../../../assets/fonts/TitilliumWeb-Light.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image
          key={this.props.key}
          source={this.props.backgroundImageFile}
          style={[styles.backgroundImage, this.props.backgroundImageStyle]}
        >
          <View style={styles.statusBar}>
            <StatusBar
              backgroundColor={"transparent"}
              translucent
              hidden={true}
            />
          </View>
          <Text
            style={[
              { fontFamily: this.state.fontLoaded ? "titillium-light" : null },
              styles.textStyle,
              this.props.textStyle
            ]}
          >
            {this.props.text}
          </Text>
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
  textStyle: {
    fontSize: 30,
    color: "black",
    backgroundColor: "rgba(0,0,0,0)",
    textAlign: "center"
  },
  statusBar: {
    height: Platform.OS === "ios" ? 20 : StatusBar.currentHeight,
    backgroundColor: "rgba(0,0,0,0)",
    width: SCREEN_WIDTH
  }
};

export default MainWalkthroughContainer;
