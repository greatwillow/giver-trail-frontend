"use strict";

import React, { Component } from "react";

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/dimensions";
import commonColors from "../../../../constants/colors";

class ImageRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemSelected: false
    };
  }

  _onPressSelectItem = () => {
    this.setState({
      itemSelected: !this.state.itemSelected
    });
  };

  render() {
    const INNER_WIDTH = this.props.INNER_WIDTH;
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          borderColor: this.state.itemSelected ? "red" : null,
          borderWidth: this.state.itemSelected ? 3 : null
        }}
        onPress={this._onPressSelectItem}
      >
        <Image
          source={this.props.image}
          style={{
            width: this.props.INNER_WIDTH,
            height: this.props.INNER_WIDTH / 2
          }}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({});

export default ImageRow;
