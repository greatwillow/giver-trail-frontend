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

import commonColors from "../../../../styles/colors";
import { SCREEN_WIDTH } from "../../../../styles/dimensions";
import { userSignup } from "../../../../data/users/actions";
import TextInputSingleLine from "../../../../components/TextInputSingleLine";
import ButtonGeneric from "../../../../components/ButtonGeneric";

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: true };
  }

  _onPressSignup = () => {
    this.setState({ modalVisible: false });
    this.props.navigation.navigate("userRegistration");
    this.props.userSignup(
      { userId: 345748 },
      { userEmail: "george@gmail.com" }
    );
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
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={styles.textStyle}>Sign Up!</Text>
            </View>
            <View style={{ flex: 2 }}>
              <TextInputSingleLine
                placeholder={"Email Address"}
                keyboardType={"email-address"}
              />
              <TextInputSingleLine
                placeholder={"Password"}
                secureTextEntry={true}
              />
              <TextInputSingleLine
                placeholder={"Retype Password"}
                secureTextEntry={true}
                returnKeyType={"done"}
              />
              <ButtonGeneric
                style={{ backgroundColor: commonColors.GREEN }}
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
  userSignup: (userId, userEmail) => dispatch(userSignup(userId, userEmail))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
