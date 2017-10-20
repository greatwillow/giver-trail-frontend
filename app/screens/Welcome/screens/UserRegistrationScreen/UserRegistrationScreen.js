"use strict";

import React, { Component } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

import { SCREEN_WIDTH } from "../../../../constants/dimensions";
import commonColors from "../../../../constants/colors";
import ModalList from "../../../../components/ModalList";
import ButtonGeneric from "../../../../components/ButtonGeneric";
import provinceData from "../../../../assets/pureData/provinceData";

class UserRegistrationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      chosenProvince: null
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

  _onPressProvinceItem = e => {
    this.setState({
      chosenProvince: e.value,
      modalVisible: false
    });
  };

  render() {
    return (
      <View style={styles.layoutStyle}>
        <ModalList
          modalVisible={this.state.modalVisible}
          data={provinceData}
          onPress={this._onPressProvinceItem}
        />
        <ButtonGeneric
          onPress={this._onPressProvinceListView}
          text={"Pick Your Province!"}
          style={{
            borderWidth: 2,
            borderColor: commonColors.GREEN
          }}
          textStyle={{
            color: commonColors.GREEN
          }}
        />
        <ButtonGeneric
          onPress={this._onPressProvinceListView}
          text={"Pick Your City!"}
        />

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
    width: SCREEN_WIDTH,
    backgroundColor: "white"
  },
  textStyle: {
    fontSize: 30,
    color: commonColors.GREEN
  }
});

export default UserRegistrationScreen;
