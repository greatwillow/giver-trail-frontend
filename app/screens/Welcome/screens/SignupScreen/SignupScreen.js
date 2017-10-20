"use strict";

import React, { Component } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import commonColors from "../../../../constants/colors";
import { SCREEN_WIDTH } from "../../../../constants/dimensions";
import * as actions from "../../../../data/appActions";
import TextInputSingleLine from "../../../../components/TextInputSingleLine";
import ButtonGeneric from "../../../../components/ButtonGeneric";

class SignupScreen extends Component {
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
      RetypedUserPassword: "",
      userRetypedPasswordValid: null,
      showInvalidRetypedPasswordUI: false
    };
  }

  _onPressSignup = () => {
    if (
      this.state.userEmailValid &&
      this.state.userPasswordValid &&
      this.state.userRetypedPasswordValid
    ) {
      this.setState({ modalVisible: false });
      this.props.navigation.navigate("userRegistration");
      this.props.userSignup(
        { userEmail: this.state.userEmail },
        { userPassword: this.state.userPassword }
      );
    }
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

  _handleRetypedPasswordTextChange = input => {
    input === this.state.userPassword && input.length >= 8
      ? this.setState({
          userRetypedPasswordValid: true,
          userRetypedPassword: input
        })
      : this.setState({
          userRetypedPasswordValid: false,
          userRetypedPassword: input
        });
  };

  _handleRetypedPasswordSubmit = () => {
    this.state.userPasswordValid
      ? this.setState({ showInvalidRetypedPasswordUI: false })
      : this.setState({ showInvalidRetypedPasswordUI: true });
  };

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
      >
        <Image
          source={require("../../../../assets/images/hooded-sitter.jpeg")}
          style={styles.backgroundImage}
        >
          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.layoutStyle}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.textStyle}>Sign Up!</Text>
            </View>
            <View style={{ flex: 2 }}>
              <TextInputSingleLine
                autoFocuse={true}
                placeholder={"Email Address"}
                keyboardType={"email-address"}
                onChangeText={this._handleEmailTextChange}
                onEndEditing={this._handleEmailSubmit}
                invalid={this.state.showInvalidEmailUI}
                invalidText={"Invalid Email!"}
              />
              <TextInputSingleLine
                placeholder={"Password"}
                secureTextEntry={true}
                onChangeText={this._handlePasswordTextChange}
                onEndEditing={this._handlePasswordSubmit}
                invalid={this.state.showInvalidPasswordUI}
                invalidText={"Password should be at least 8 characters!"}
              />
              <TextInputSingleLine
                placeholder={"Retype Password"}
                secureTextEntry={true}
                returnKeyType={"done"}
                onChangeText={this._handleRetypedPasswordTextChange}
                onEndEditing={this._handleRetypedPasswordSubmit}
                invalid={this.state.showInvalidRetypedPasswordUI}
                invalidText={"Passwords don't match!"}
              />
              <ButtonGeneric
                style={{
                  backgroundColor: commonColors.GREEN,
                  borderColor: commonColors.GREEN
                }}
                textStyle={{ color: "white" }}
                text={"Signup!"}
                onPress={this._onPressSignup}
              />
            </View>
          </KeyboardAwareScrollView>
        </Image>
      </Modal>
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
    resizeMode: "cover",
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
    color: "black"
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
  }
});

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  userSignup: (userEmail, userPassword) =>
    dispatch(actions.userSignup(userEmail, userPassword))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
