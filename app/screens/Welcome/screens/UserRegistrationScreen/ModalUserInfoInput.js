"use strict";

import React, { Component } from "react";

import {
  FlatList,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";

import { connect } from "react-redux";
import * as actions from "../../../../data/appActions";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/dimensions";
import commonColors from "../../../../constants/colors";
import GenericListItem from "../../../../components/GenericListItem";
import GenericButton from "../../../../components/GenericButton";
import TextFontTitillium from "../../../../components/TextFontTitillium";
import TextInputSingleLine from "../../../../components/TextInputSingleLine";

class ModalUserInfoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFirstName: null,
      userLastName: null,
      userFirstNameValid: true,
      userLastNameValid: true,
      showFirstNameInvalidUI: false,
      showLastNameInvalidUI: false
    };
  }

  _handleFirstNameChangeText = input => {
    input.length <= 2
      ? this.setState({ userFirstNameValid: false, userFirstName: input })
      : this.setState({ userFirstNameValid: true, userFirstName: input });
  };

  _handleFirstNameSubmit = () => {
    this.state.userFirstNameValid
      ? this.setState({ showFirstNameInvalidUI: false })
      : this.setState({ showFirstNameInvalidUI: true });
  };

  _handleLastNameChangeText = input => {
    input.length <= 2
      ? this.setState({ userLastNameValid: false, userLastName: input })
      : this.setState({ userLastNameValid: true, userLastName: input });
  };

  _handleLastNameSubmit = () => {
    this.state.userFirstNameValid
      ? this.setState({ showLastNameInvalidUI: false })
      : this.setState({ showLastNameInvalidUI: true });
  };

  _onRequestClose(item) {
    if (
      this.state.userFirstName &&
      this.state.userLastName &&
      this.state.userFirstNameValid &&
      this.state.userLastNameValid
    ) {
      this.props.modalUserInfoInput(false);
      this.props.setUserAge(item.key);
      this.props.setUserFirstName(this.state.userFirstName);
      this.props.setUserLastName(this.state.userLastName);
    } else {
      this.setState({
        showFirstNameInvalidUI: true,
        showLastNameInvalidUI: true
      });
    }
  }

  _renderListItem = ({ item }) => {
    return (
      <GenericListItem
        id={item.key}
        title={item.title}
        onPress={this._onRequestClose.bind(this, item)}
      />
    );
  };

  render() {
    return (
      <View>
        <Modal
          visible={this.props.modalUI.modalUserInfoInput}
          //onRequestClose={this._onRequestClose}
        >
          <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
              <View style={styles.textContainer}>
                <TextFontTitillium style={styles.title}>
                  Your Info!
                </TextFontTitillium>
                <TextFontTitillium style={styles.standardText}>
                  First Name
                  {this.state.showFirstNameInvalidUI ? (
                    <Text style={{ color: "red" }}>
                      {"   "}Need First Name!
                    </Text>
                  ) : null}
                </TextFontTitillium>
                <TextInputSingleLine
                  style={styles.standardTextInput}
                  onChangeText={this._handleFirstNameChangeText}
                  onEndEditing={this._handleFirstNameSubmit}
                />
                <TextFontTitillium style={styles.standardText}>
                  Last Name
                  {this.state.showLastNameInvalidUI ? (
                    <Text style={{ color: "red" }}>{"   "}Need Last Name!</Text>
                  ) : null}
                </TextFontTitillium>
                <TextInputSingleLine
                  style={styles.standardTextInput}
                  onChangeText={this._handleLastNameChangeText}
                  onEndEditing={this._handleLastNameSubmit}
                />
                <TextFontTitillium style={styles.standardText}>
                  Age Range
                </TextFontTitillium>
              </View>
              <View style={styles.listContainer}>
                <FlatList
                  style={styles.flatList}
                  data={this.props.data}
                  renderItem={this._renderListItem}
                />
              </View>
            </View>
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
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: SCREEN_WIDTH / 6 * 5,
    height: SCREEN_HEIGHT / 4 * 3,
    backgroundColor: commonColors.GREEN,
    borderRadius: 10
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
    width: SCREEN_WIDTH / 6 * 5 - 40,
    padding: 15
  },
  listContainer: {
    flex: 1,
    backgroundColor: "white",
    width: SCREEN_WIDTH / 6 * 5 - 40,
    height: SCREEN_HEIGHT / 2 - 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
  },
  flatList: {
    margin: 10,
    width: SCREEN_WIDTH / 6 * 5 - 70,
    height: SCREEN_HEIGHT / 2 - 70
  },
  title: {
    fontSize: 25,
    textAlign: "center"
  },
  standardText: {
    fontSize: 15,
    textAlign: "left"
  },
  standardTextInput: {
    width: SCREEN_WIDTH / 6 * 5 - 40
  }
});

const mapStateToProps = state => ({
  modalUI: state.modalUI
});
const mapDispatchToProps = dispatch => ({
  modalUserInfoInput: visible => dispatch(actions.modalUserInfoInput(visible))
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalUserInfoInput);
