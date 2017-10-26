"use strict";

import React, { Component } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import * as actions from "../../../../data/appActions";

import { SCREEN_WIDTH } from "../../../../constants/dimensions";
import commonColors from "../../../../constants/colors";
import ModalUserInfoInput from "./ModalUserInfoInput";
import ModalCitySearch from "./ModalCitySearch";
import ModalInterestSelector from "./ModalInterestSelector";
import ButtonGeneric from "../../../../components/ButtonGeneric";
import ageData from "../../../../assets/pureData/ageData";
import TextFontTitillium from "../../../../components/TextFontTitillium";

class UserRegistrationScreen extends Component {
  _onPressRegister = () => {
    this.props.navigation.navigate("drawer");
    this.props.sendNewUserRegistrationData({
      userAge: 8,
      userCity: "Montreal",
      userPassionsList: "mock passions list"
    });
  };

  _onPressOpenModalUserInfoInput = () => {
    this.props.modalUserInfoInput(true);
  };

  _onPressOpenModalCitySearch = () => {
    this.props.modalCitySearch(true);
  };

  _onPressOpenModalInterestSelector = () => {
    this.props.modalInterestSelector(true);
  };

  render() {
    return (
      <View style={styles.layoutStyle}>
        <ModalUserInfoInput data={ageData} />
        <ModalCitySearch />
        <ModalInterestSelector />
        {/*----------- USER INFO INPUT -----------*/}

        <View style={{ flexDirection: "row" }}>
          <View style={styles.numberContainer}>
            <TextFontTitillium style={styles.numberText}>1</TextFontTitillium>
          </View>
          <ButtonGeneric
            onPress={this._onPressOpenModalUserInfoInput}
            text={"What's Your Info?"}
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
            onPress={this._onPressOpenModalCitySearch}
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
            onPress={this._onPressOpenModalInterestSelector}
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

const mapStateToProps = state => ({
  user: state.user,
  modalUI: state.modalUI
});
const mapDispatchToProps = dispatch => ({
  sendNewUserRegistrationData: inputObject =>
    dispatch(actions.sendNewUserRegistrationData(inputObject)),
  modalUserInfoInput: visible => dispatch(actions.modalUserInfoInput(visible)),
  modalCitySearch: visible => dispatch(actions.modalCitySearch(visible)),
  modalInterestSelector: visible =>
    dispatch(actions.modalInterestSelector(visible))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  UserRegistrationScreen
);
