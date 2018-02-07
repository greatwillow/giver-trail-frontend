"use strict";

import React, { Component } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/dimensions";
import commonColors from "../../../../constants/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import TextFontTitillium from "../../../../components/TextFontTitillium";

class NavArrows extends Component {
  render() {
    return (
      <View style={[styles.mainContainer, this.props.style]}>
        <TouchableOpacity
          onPress={this.props.navBackward}
          style={{ flex: 1, alignItems: "center" }}
        >
          <Icon name="arrow-back" size={30} color={"black"} />
        </TouchableOpacity>
        <View style={{ flex: 2 }}>
          <TextFontTitillium
            style={{
              textAlign: "center",
              fontSize: 25,
              paddingBottom: 10
            }}
          >
            <Text
              style={{
                color:
                  this.props.registrationUI.chosenRegPage === "userInfoInput"
                    ? commonColors.PINK
                    : "black"
              }}
            >
              {"  "}
              1
            </Text>
            {"  "}
            |<Text
              style={{
                color:
                  this.props.registrationUI.chosenRegPage === "citySearch"
                    ? commonColors.PINK
                    : "black"
              }}
            >
              {"  "}
              2
            </Text>
            {"  "}
            |
            <Text
              style={{
                color:
                  this.props.registrationUI.chosenRegPage === "interestSelector"
                    ? commonColors.PINK
                    : "black"
              }}
            >
              {"  "}
              3
            </Text>
            {"  "}
          </TextFontTitillium>
        </View>
        <TouchableOpacity
          onPress={this.props.navForward}
          style={{ flex: 1, alignItems: "center" }}
        >
          <Icon name="arrow-forward" size={30} color={"black"} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SCREEN_WIDTH / 6 * 5,
    height: SCREEN_HEIGHT / 12 * 1,
    borderRadius: 10,
    borderColor: commonColors.GREEN,
    borderWidth: 0,
    marginTop: 10,
    padding: 20,
    paddingRight: 30,
    paddingLeft: 30,
    backgroundColor: "rgba(255,255,255,0.8)"
  }
});

export default NavArrows;
