"use strict";

import React, { Component } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import commonColors from "../constants/colors";

class GenericListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      selected: nextProps
    });
  }
  render() {
    return (
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor:
              this.state.selected === true ? commonColors.GREEN : "white"
          }
        ]}
        onPress={this.props.onPress}
      >
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
    justifyContent: "center",
    alignSelf: "center"
  }
});

export default GenericListItem;
