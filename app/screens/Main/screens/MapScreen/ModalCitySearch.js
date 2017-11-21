"use strict";

import React, { Component } from "react";

import {
  Image,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  View
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../../../../data/appActions";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/dimensions";
import commonColors from "../../../../constants/colors";
import GoogleAutocompleteSearch from "./GoogleAutocompleteSearch";


class ModalCitySearch extends Component {
  _onRequestClose = () => {
    this.props.modalCitySearch(false);
  };

  // _onPressGetCity = (data, details) => {
  //   this.props.modalCitySearch(false);
  //   console.log("Data is ", data);
  //   console.log("Details are ", details);
  //   this.props.setUserCity(details.name);
  // };

  render() {
    return (
      <View>
        <Modal
          visible={this.props.modalUI.modalCitySearch}
          onRequestClose={this._onRequestClose}
        >
          <View style={styles.outerContainer}>
            <KeyboardAvoidingView behavior="padding">
              <View style={styles.innerContainer}>
                <View style={styles.listContainer}>
                <GoogleAutocompleteSearch
                  {...this.props}
                  explicitSetMapRegion={(region) => this.props.explicitSetMapRegion(region)} 
                />
                </View>
              </View>
              <View style={{ height: 50 }} />
            </KeyboardAvoidingView>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: SCREEN_WIDTH / 6 * 5,
    height: SCREEN_HEIGHT / 2,
    marginTop: 100,
    backgroundColor: commonColors.GREEN,
    borderRadius: 10
  },
  listContainer: {
    borderRadius: 10,
    margin: 15,
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => ({
  modalUI: state.modalUI
});
const mapDispatchToProps = dispatch => ({
  modalCitySearch: visible => dispatch(actions.modalCitySearch(visible))
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalCitySearch);
