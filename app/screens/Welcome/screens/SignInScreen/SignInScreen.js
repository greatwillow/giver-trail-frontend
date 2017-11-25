"use strict";

import React, { Component } from "react";
import {
  ImageBackground,
  Modal,
  Platform,
  StatusBar,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { connect } from "react-redux";

import { NavigationActions } from "react-navigation";

import commonColors from "../../../../constants/colors";
import { SCREEN_WIDTH } from "../../../../constants/dimensions";
import * as actions from "../../../../data/appActions";
import TextInputSingleLine from "../../../../components/TextInputSingleLine";
import GenericButton from "../../../../components/GenericButton";
import TextFontTitillium from "../../../../components/TextFontTitillium";

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      userEmail: null,
      userEmailValid: null,
      showInvalidEmailUI: false,
      userPassword: "",
      userPasswordValid: null,
      showInvalidPasswordUI: false,
    };
  }

  _onPressSignIn = () => {
    if(this.props.isConnected) {
      if (
        this.state.userEmailValid &&
        this.state.userPasswordValid
      ) {
        this.setState({ modalVisible: false });
        this.props.attemptUserSignIn(
          { userEmail: this.state.userEmail },
          { userPassword: this.state.userPassword }
        );
      }
    } else {
      alert("You are currently Offline. You must be online to Sign In!")
    }
  };

  _onRequestClose = () => {
    this.setState({
      modalVisible: false
    });
    const backAction = NavigationActions.back({ key: "login" });
    this.props.navigation.dispatch(backAction);
  };

  _handleEmailTextChange = input => {
    const validEmailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (validEmailFormat.test(input)) {
      this.setState({ userEmailValid: true, userEmail: input });
    } else {
      this.setState({ userEmailValid: false, userEmail: input });
    }
  };

  _handleEmailSubmit = () => {
    this.state.userEmailValid
      ? this.setState({ showInvalidEmailUI: false })
      : this.setState({ showInvalidEmailUI: true });
  };

  _handlePasswordTextChange = input => {
    input.length >= 8
      ? this.setState({ userPasswordValid: true, userPassword: input })
      : this.setState({ userPasswordValid: false, userPassword: input });
  };

  _handlePasswordSubmit = () => {
    this.state.userPasswordValid
      ? this.setState({ showInvalidPasswordUI: false })
      : this.setState({ showInvalidPasswordUI: true });
  };


  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this._onRequestClose}
        >
          <ImageBackground
            source={require("../../../../assets/images/starry-headlamp.jpeg")}
            style={styles.backgroundImage}
          >
            
              <View style={styles.titleContainer}>
                <TextFontTitillium style={styles.textStyle}>
                  Sign In!
                </TextFontTitillium>
              </View>
              <View style={{ flex: 6 }}>
                <TextInputSingleLine
                  autoFocuse={true}
                  placeholder={"Email Address"}
                  keyboardType={"ascii-capable"}
                  onChangeText={this._handleEmailTextChange}
                  onEndEditing={this._handleEmailSubmit}
                  invalid={this.state.showInvalidEmailUI}
                  invalidText={"Invalid Email!"}
                />
                <TextInputSingleLine
                  placeholder={"Password"}
                  keyboardType={"ascii-capable"}
                  secureTextEntry={true}
                  onChangeText={this._handlePasswordTextChange}
                  onEndEditing={this._handlePasswordSubmit}
                  invalid={this.state.showInvalidPasswordUI}
                  invalidText={"Password should be at least 8 characters!"}
                />
                <GenericButton
                  style={{
                    backgroundColor: commonColors.GREEN,
                    borderColor: commonColors.GREEN
                  }}
                  textStyle={{ color: "white" }}
                  text={"Sign In!"}
                  onPress={this._onPressSignIn}
                />
              </View>
            
            <View style={styles.statusBar}>
          <StatusBar
            backgroundColor={"transparent"}
            translucent
            hidden={true}
          />
        </View>
          </ImageBackground>
        </Modal>
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
  backgroundImage: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: null,
    justifyContent: "center",
    alignItems: "center"
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textStyle: {
    fontSize: 30,
    color: "white"
  },
  textInputSingleLine: {
    backgroundColor: "white",
    marginBottom: 10,
    padding: 5,
    paddingLeft: 10,
    borderRadius: 5,
    height: 40,
    width: SCREEN_WIDTH / 6 * 5,
    alignSelf: "center"
  },
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 20, //Platform.OS === "ios" ? 20 : StatusBar.currentHeight,
    backgroundColor: "rgba(0,0,0,0)",
    width: SCREEN_WIDTH
  }
});

const mapStateToProps = state => ({
  user: state.user,
  isConnected: state.network.isConnected
});
const mapDispatchToProps = dispatch => ({
  attemptUserSignIn: (userEmail, userPassword) =>
    dispatch(actions.attemptUserSignIn(userEmail, userPassword))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
