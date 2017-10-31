import React, { Component } from "react";
import {
  Dimensions,
  Image,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";

import LoginScreen from "../LoginScreen/LoginScreen";
import ButtonGeneric from "../../../../components/ButtonGeneric";
import MainWalkthroughContainer from "./MainWalkthroughContainer";
import WALKTHROUGH_DATA from "../../../../assets/pureData/walkthroughData";
import TextFontTitillium from "../../../../components/TextFontTitillium";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/colors";
import commonColors from "../../../../constants/colors";

class WalkthroughScreen extends Component {
  _onPressLogin = () => {
    this.props.navigation.navigate("login");
  };

  _onPressSignup = () => {
    this.props.navigation.navigate("signup");
  };

  _renderScreenData = (page, index) => {
    switch (index) {
      case WALKTHROUGH_DATA.length - 3:
        return (
          <View>
            <View
              style={{
                flex: 2,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TextFontTitillium style={styles.titleSubStyle}>
                Welcome To The
              </TextFontTitillium>
              <TextFontTitillium style={styles.titleStyle}>
                ~ GiverTrail ~
              </TextFontTitillium>
              <TextFontTitillium style={styles.titleSubStyle}>
                Project
              </TextFontTitillium>
            </View>
            <View style={styles.spaceContainer} />
          </View>
        );
      case WALKTHROUGH_DATA.length - 2:
        return (
          <View>
            <View
              style={{
                flex: 2,
                width: SCREEN_WIDTH / 6 * 5,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TextFontTitillium style={styles.textStyle}>
                {page.text}
              </TextFontTitillium>
            </View>
            <View style={styles.spaceContainer} />
          </View>
        );
      case WALKTHROUGH_DATA.length - 1:
        return (
          <View>
            <View
              style={{
                flex: 2,
                width: SCREEN_WIDTH / 6 * 5,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TextFontTitillium style={styles.textStyle}>
                {page.text}
              </TextFontTitillium>
            </View>
            <View style={{ flex: 2 }} />
            <View style={{ flex: 2 }}>
              <ButtonGeneric
                style={styles.button}
                text={"Login!"}
                onPress={this._onPressLogin}
              />
              <ButtonGeneric
                style={styles.button}
                text={"Signup!"}
                onPress={this._onPressSignup}
              />
            </View>
          </View>
        );
      default:
        return;
    }
  };

  _renderWalkthrough() {
    return WALKTHROUGH_DATA.map((page, index) => {
      return (
        <MainWalkthroughContainer
          key={page.key}
          backgroundImageFile={page.backgroundImageFile}
        >
          {this._renderScreenData(page, index)}
        </MainWalkthroughContainer>
      );
    });
  }

  render() {
    return (
      <ScrollView horizontal style={{ flex: 1 }} pagingEnabled>
        {this._renderWalkthrough()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 40,
    color: commonColors.GREEN,
    backgroundColor: "rgba(0,0,0,0)",
    textAlign: "center"
  },
  titleSubStyle: {
    fontSize: 20,
    color: "black",
    backgroundColor: "rgba(0,0,0,0)",
    textAlign: "center"
  },
  textStyle: {
    fontSize: 25,
    color: "black",
    backgroundColor: "rgba(0,0,0,0)",
    textAlign: "center",
    margin: 20
  },
  spaceContainer: {
    flex: 4
  },
  button: {
    borderColor: commonColors.GREEN,
    backgroundColor: commonColors.GREEN,
    margin: 20
  }
});

export default WalkthroughScreen;
