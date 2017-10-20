"use strict";

import React, { Component } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

class ModalListItem extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <Text style={styles.text}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: 18
  },
  container: {
    height: 50,
    width: 300,
    borderBottomWidth: 1,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    alignSelf: "center"
  }
});

export default ModalListItem;
