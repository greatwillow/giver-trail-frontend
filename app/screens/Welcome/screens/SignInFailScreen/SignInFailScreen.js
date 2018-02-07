import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";

import TextFontTitillium from "../../../../components/TextFontTitillium";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/colors";
import commonColors from "../../../../constants/colors";
import GenericButton from "../../../../components/GenericButton";

class SignInFailScreen extends Component {
  _onPressLogin = () => {
    this.props.navigation.navigate("signIn");
  };

  _onPressSignup = () => {
    this.props.navigation.navigate("signup");
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View style={{ flex: 1 }}>
            <TextFontTitillium
              style={{
                fontSize: 30,
                padding: 15,
                marginLeft: 15
              }}
            >
              ~
            </TextFontTitillium>
          </View>
          <View style={{ flex: 4 }}>
            <TextFontTitillium style={styles.textStyle}>
              It looks like there was a mistake with your email or password
              input.
            </TextFontTitillium>
          </View>
          <View style={{ flex: 1 }}>
            <TextFontTitillium
              style={{
                fontSize: 30,
                padding: 15,
                marginRight: 15
              }}
            >
              ~
            </TextFontTitillium>
          </View>
        </View>
        <TextFontTitillium style={styles.textStyle}>
          {"\n"}
          Would you like to try again?
        </TextFontTitillium>
        <GenericButton
          style={styles.button}
          text={"Try Sign In Again"}
          onPress={this._onPressLogin}
        />
        <TextFontTitillium style={styles.textStyle}>
          {"\n"}
          {"\n"}
          Or perhaps you don't yet have an account?
        </TextFontTitillium>
        <GenericButton
          style={styles.button}
          text={"Signup Here"}
          onPress={this._onPressSignup}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: SCREEN_WIDTH / 6 * 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  titleStyle: {
    fontSize: 20,
    color: "black",
    backgroundColor: "rgba(0,0,0,0)",
    textAlign: "center",
    margin: 10
  },
  textStyle: {
    fontSize: 18,
    color: "black",
    backgroundColor: "rgba(0,0,0,0)",
    textAlign: "center",
    margin: 20
  },
  button: {
    borderColor: commonColors.GREEN,
    backgroundColor: commonColors.GREEN,
    margin: 20
  }
});

export default SignInFailScreen;
