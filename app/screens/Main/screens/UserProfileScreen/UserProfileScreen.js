"use strict";

import { connect } from "react-redux";
import * as actions from "../../../../data/appActions";

import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SCREEN_WIDTH } from "../../../../constants/dimensions";
import commonColors from "../../../../constants/colors";
import TextFontTitillium from "../../../../components/TextFontTitillium";

import GenericButton from "../../../../components/GenericButton";
import DrawerScreen from "../DrawerScreen/DrawerScreen";
import interestImageData from "../../../../assets/pureData/interestImageData";
import ageData from "../../../../assets/pureData/ageData";

class UserProfileScreen extends Component {
  _onPressDrawerToggle = () => {
    this.props.navigation.navigate("DrawerToggle");
  };

  _renderInterestImages = () => {
    return this.props.user.userPassionsList.map(item => {
      const interestImageIndex = interestImageData.map(x => x.id).indexOf(item);
      return (
        <View key={item} style={{ flex: 1, alignItems: "center" }}>
          <Image
            source={interestImageData[interestImageIndex].image}
            style={{
              width: SCREEN_WIDTH / 6 * 5,
              height: SCREEN_WIDTH / 12 * 3
            }}
          />
        </View>
      );
    });
  };

  _renderAge = () => {
    if (this.props.user.userAge) {
      const ageIndex = ageData.map(x => x.key).indexOf(this.props.user.userAge);
      const age = ageData[ageIndex].title;
      return <Text> {age}</Text>;
    } else {
      const age = "Unspecified";
      return <Text> {age}</Text>;
    }
  };

  render() {
    return (
      <View style={styles.layoutStyle}>
        <View style={styles.headerContainer} />
        <View style={{ flex: 4 }}>
          <View style={styles.mainContentContainer}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <TextFontTitillium style={{ fontSize: 20 }}>
                  <Text style={{ color: commonColors.PINK }}>
                    My Age Range:
                  </Text>
                  {this._renderAge()} {"\n"}
                </TextFontTitillium>
              </View>
              <View style={{ flex: 1 }}>
                <TextFontTitillium style={{ fontSize: 20 }}>
                  <Text
                    style={{ color: commonColors.PINK, borderBottomWidth: 1 }}
                  >
                    My Home Base:{" "}
                  </Text>
                  {this.props.user.userCity.name} {"\n"}
                  <Text style={{ color: commonColors.PINK }}>
                    My Interests:
                  </Text>
                </TextFontTitillium>
              </View>
            </View>
          </View>

          <View style={styles.interestImageContainer}>
            <ScrollView>{this._renderInterestImages()}</ScrollView>
          </View>
        </View>
        <View style={styles.nameAndEmailContainer}>
          <TextFontTitillium style={styles.nameStyle}>
            {this.props.user.userFirstName} {this.props.user.userLastName}
          </TextFontTitillium>
          <TextFontTitillium style={styles.emailStyle}>
            {this.props.user.userEmail}
          </TextFontTitillium>
        </View>
        <Image
          source={require("../../../../assets/images/girl-head-mountain.jpg")}
          style={styles.profileImage}
        />
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
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    position: "absolute",
    top: 10,
    left: 10
  },
  nameAndEmailContainer: {
    position: "absolute",
    top: 10,
    left: 150,
    right: 10,
    height: 130,
    alignItems: "center",
    justifyContent: "center"
  },
  nameStyle: {
    fontSize: 25,
    backgroundColor: "rgba(0,0,0,0)",
    color: commonColors.GREEN,
    textAlign: "center"
  },
  emailStyle: {
    fontSize: 15,
    backgroundColor: "rgba(0,0,0,0)",
    color: commonColors.GREEN,
    textAlign: "center"
  },
  headerContainer: {
    flex: 0,
    height: 150,
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: commonColors.DARK_GREY,
    borderBottomWidth: 2,
    borderColor: commonColors.GREEN
  },
  mainContentContainer: {
    flex: 2,
    width: SCREEN_WIDTH,
    padding: 20
  },
  interestImageContainer: {
    flex: 1,
    width: SCREEN_WIDTH
  }
});

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  getUserData: inputObject => dispatch(actions.getUserData(inputObject))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen);
