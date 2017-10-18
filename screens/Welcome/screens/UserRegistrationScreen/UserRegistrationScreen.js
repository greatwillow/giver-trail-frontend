"use strict";

import React, { Component } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

import { SCREEN_WIDTH } from "../../../../styles/dimensions";

import ModalList from "./components/ModalList";
import ButtonGeneric from "../../../../components/ButtonGeneric";

class UserRegistrationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false
    };
  }
  _onPressRegister = () => {
    this.props.navigation.navigate("drawer");
  };

  _onPressProvinceListView = () => {
    this.setState({
      modalVisible: true
    });
  };

  render() {
    return (
      <View style={styles.layoutStyle}>
        <ModalList modalVisible={this.state.modalVisible} />
        <ButtonGeneric onPress={this._onPressProvinceListView} />
        <ButtonGeneric onPress={this._onPressRegister} text={"Let's Go!"} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layoutStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH
  },
  textStyle: {
    fontSize: 30,
    color: "red"
  }
});

export default UserRegistrationScreen;
