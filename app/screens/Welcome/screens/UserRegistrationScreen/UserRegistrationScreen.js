"use strict";

import React, { Component } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

import { SCREEN_WIDTH } from "../../../../constants/dimensions";
import commonColors from "../../../../constants/colors";
import ModalList from "../../../../components/ModalList";
import ButtonGeneric from "../../../../components/ButtonGeneric";
import ageData from "../../../../assets/pureData/ageData";
import ModalCitySearch from "./ModalCitySearch";
import ModalImageSelector from "./ModalImageSelector";
import TextFontTitillium from "../../../../components/TextFontTitillium";

class UserRegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAgeSearchVisible: false,
      modalCitySearchVisible: false,
      modalImageSelectorVisible: false,
      chosenAge: null
    };
  }

  _onPressRegister = () => {
    this.props.navigation.navigate("drawer");
  };

  _onPressAgeSearchView = () => {
    this.setState({
      modalAgeSearchVisible: true
    });
  };

  _onPressAgeSearchClose = e => {
    this.setState({
      chosenAge: e.value,
      modalAgeSearchVisible: false
    });
  };

  _onPressCitySearchView = () => {
    this.setState({
      modalCitySearchVisible: true
    });
  };

  _onPressCitySearchClose = () => {
    this.setState({
      modalCitySearchVisible: false
    });
  };

  _onPressImageSelectorView = () => {
    this.setState({
      modalImageSelectorVisible: true
    });
  };

  _onPressImageSelectorClose = () => {
    this.setState({
      modalImageSelectorVisible: false
    });
  };

  render() {
    return (
      <View style={styles.layoutStyle}>
        <ModalList
          modalVisible={this.state.modalAgeSearchVisible}
          data={ageData}
          onPress={this._onPressAgeSearchClose}
        />
        <ModalCitySearch
          modalVisible={this.state.modalCitySearchVisible}
          onPress={this._onPressCitySearchClose}
        />
        <ModalImageSelector
          modalVisible={this.state.modalImageSelectorVisible}
          onPress={this._onPressImageSelectorClose}
        />
        {/*----------- AGE SELECTION -----------*/}

        <View style={{ flexDirection: "row" }}>
          <View style={styles.numberContainer}>
            <TextFontTitillium style={styles.numberText}>1</TextFontTitillium>
          </View>
          <ButtonGeneric
            onPress={this._onPressAgeSearchView}
            text={"Pick Your Age Range!"}
            style={styles.customButton}
            textStyle={styles.customButtonText}
          />
        </View>
        {/*----------- CITY SELECTION -----------*/}
        <View style={{ flexDirection: "row" }}>
          <View style={styles.numberContainer}>
            <TextFontTitillium style={styles.numberText}>2</TextFontTitillium>
          </View>
          <ButtonGeneric
            onPress={this._onPressCitySearchView}
            text={"Pick Your City!"}
            style={styles.customButton}
            textStyle={styles.customButtonText}
          />
        </View>
        {/*----------- PASSIONS SELECTION -----------*/}
        <View style={{ flexDirection: "row" }}>
          <View style={styles.numberContainer}>
            <TextFontTitillium style={styles.numberText}>3</TextFontTitillium>
          </View>
          <ButtonGeneric
            onPress={this._onPressImageSelectorView}
            text={"Pick Your Passion!"}
            style={styles.customButton}
            textStyle={styles.customButtonText}
          />
        </View>
        {/*----------- NAVIGATE FORWARD -----------*/}
        <View style={{ flexDirection: "row" }}>
          <View style={styles.numberContainer}>
            <TextFontTitillium style={styles.numberText}>4</TextFontTitillium>
          </View>
          <ButtonGeneric
            onPress={this._onPressRegister}
            text={"Let's Go!!"}
            style={styles.customButton}
            textStyle={styles.customButtonText}
          />
        </View>
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
    backgroundColor: "white",
    paddingBottom: 100
  },
  customButton: {
    borderWidth: 2,
    borderColor: commonColors.GREEN,
    width: SCREEN_WIDTH / 6 * 4,
    height: SCREEN_WIDTH / 6,
    margin: 15,
    padding: 12,
    marginLeft: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  customButtonText: {
    color: commonColors.DARK_GREY
  },
  numberContainer: {
    borderWidth: 1,
    height: SCREEN_WIDTH / 6,
    width: SCREEN_WIDTH / 6,
    borderColor: commonColors.PINK,
    borderRadius: SCREEN_WIDTH / 12,
    padding: 15,
    margin: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  numberText: {
    fontSize: SCREEN_WIDTH / 12,
    color: commonColors.DARK_GREY,
    alignSelf: "center",
    justifyContent: "center"
  }
});

export default UserRegistrationScreen;
