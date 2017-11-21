"use strict";

import React, { Component } from "react";

import { StyleSheet, Text, View } from "react-native";

//import { Font } from "expo";

class TextFontTitillium extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     fontLoaded: false
  //   };
  // }

  // async componentDidMount() {
  //   await Font.loadAsync({
  //     "titillium-light": require("../assets/fonts/TitilliumWeb-Light.ttf")
  //   });
  //   this.setState({ fontLoaded: true });
  // }

  render() {
    return (
      <View>
        <Text
        // style={[{fontFamily: 'TitilliumWeb-Light'},
        //   this.props.style]}
        style={this.props.style}
        >
          {this.props.children}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default TextFontTitillium;
