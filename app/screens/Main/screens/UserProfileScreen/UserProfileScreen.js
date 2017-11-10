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
    console.log("AGE IS ", this.props.user.userAge);
    const ageIndex = ageData.map(x => x.key).indexOf(this.props.user.userAge);
    console.log("AGE INDEX IS ", ageIndex);
    const age = ageData[ageIndex].title;
    return <Text> {age}</Text>;
  };

  render() {
    return (
      <View style={styles.layoutStyle}>
        {/*<View style={styles.profileImageContainer}>*/}
        <Image
          source={require("../../../../assets/images/girl-head-mountain.jpg")}
          style={styles.profileImage}
        />
        {/*</View>*/}
        <View style={styles.titleContainer}>
          <TextFontTitillium style={styles.titleStyle}>
            {this.props.user.userFirstName} {this.props.user.userLastName}
          </TextFontTitillium>
        </View>
        <View style={{ flex: 4 }}>
          <View style={styles.mainContentContainer}>
            <TextFontTitillium style={{ fontSize: 20 }}>
              <Text style={{ color: commonColors.PINK }}>My Email: </Text>
              {this.props.user.userEmail} {"\n"}
              <Text style={{ color: commonColors.PINK }}>My Age Range: </Text>
              {this._renderAge()} {"\n"}
              <Text style={{ color: commonColors.PINK, borderBottomWidth: 1 }}>
                My Home Base:{" "}
              </Text>
              {this.props.user.userCity} {"\n"}
              <Text style={{ color: commonColors.PINK }}>My Interests: </Text>
            </TextFontTitillium>
          </View>

          <View style={styles.interestImageContainer}>
            <ScrollView>{this._renderInterestImages()}</ScrollView>
          </View>
        </View>
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
    left: SCREEN_WIDTH / 2 - 65
  },
  // profileImageContainer: {
  //   width: SCREEN_WIDTH,
  //   flex: 2,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   backgroundColor: "white",
  //   position: "absolute",
  //   top: 10,
  //   left: SCREEN_WIDTH / 2 - 65
  // },
  titleStyle: {
    fontSize: 25,
    color: commonColors.GREEN
  },
  titleContainer: {
    flex: 2,
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
    flex: 2,
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
