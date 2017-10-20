"use strict";

import React, { Component } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

import { SCREEN_WIDTH } from "../../../../constants/dimensions";
import commonColors from "../../../../constants/colors";
import ModalList from "../../../../components/ModalList";
import ButtonGeneric from "../../../../components/ButtonGeneric";
import provinceData from "../../../../assets/pureData/provinceData";
import ModalGooglePlaceSearch from "./ModalGooglePlaceSearch";

class UserRegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisibleProvinces: false,
      modalVisibleGoogleSearch: false,
      chosenProvince: null
    };
  }
  _onPressRegister = () => {
    this.props.navigation.navigate("drawer");
  };

  _onPressProvinceListView = () => {
    this.setState({
      modalVisibleProvinces: true
    });
  };

  _onPressProvinceItem = e => {
    this.setState({
      chosenProvince: e.value,
      modalVisibleProvinces: false
    });
  };

  _onPressGoogleSearchView = () => {
    this.setState({
      modalVisibleGoogleSearch: true
    });
  };

  _onPressGoogleSearchUnview = () => {
    this.setState({
      modalVisibleGoogleSearch: false
    });
  };

  render() {
    return (
      <View style={styles.layoutStyle}>
        <ModalList
          modalVisible={this.state.modalVisibleProvinces}
          data={provinceData}
          onPress={this._onPressProvinceItem}
        />
        <ModalGooglePlaceSearch
          modalVisible={this.state.modalVisibleGoogleSearch}
          onPress={this._onPressGoogleSearchUnview}
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
          onPress={this._onPressGoogleSearchView}
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
