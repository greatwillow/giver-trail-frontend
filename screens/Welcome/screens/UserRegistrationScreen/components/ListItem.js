"use strict";

import React, { Component } from "react";

import { StyleSheet, View } from "react-native";

class ListItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Item of List!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "red",
    fontSize: 30
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default ListItem;
