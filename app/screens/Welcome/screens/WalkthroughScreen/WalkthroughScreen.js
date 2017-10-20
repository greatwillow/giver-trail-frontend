import React, { Component } from "react";
import {
  Dimensions,
  Image,
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";

import LoginScreen from "../LoginScreen/LoginScreen";
import ButtonGeneric from "../../../../components/ButtonGeneric";
import MainWalkthroughContainer from "./MainWalkthroughContainer";
import WALKTHROUGH_DATA from "../../../../assets/pureData/walkthroughData";

class WalkthroughScreen extends Component {
  _onPressLogin = () => {
    this.props.navigation.navigate("login");
  };

  _onPressSignup = () => {
    this.props.navigation.navigate("signup");
  };

  _renderLastScreenButtons = index => {
    if (index === WALKTHROUGH_DATA.length - 1) {
      return (
        <View>
          <ButtonGeneric text={"Login!"} onPress={this._onPressLogin} />
          <ButtonGeneric text={"Signup!"} onPress={this._onPressSignup} />
        </View>
      );
    }
  };

  renderWalkthrough() {
    return WALKTHROUGH_DATA.map((page, index) => {
      return (
        <MainWalkthroughContainer
          key={page.key}
          backgroundImageFile={page.backgroundImageFile}
          text={page.text}
        >
          {this._renderLastScreenButtons(index)}
        </MainWalkthroughContainer>
      );
    });
  }

  render() {
    return (
      <ScrollView horizontal style={{ flex: 1 }} pagingEnabled>
        {this.renderWalkthrough()}
      </ScrollView>
    );
  }
}

export default WalkthroughScreen;
