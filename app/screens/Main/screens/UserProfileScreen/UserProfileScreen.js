"use strict";

import { connect } from "react-redux";
import * as actions from "../../../../data/appActions";

import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SCREEN_WIDTH } from "../../../../constants/dimensions";
import commonColors from "../../../../constants/colors";
import TextFontTitillium from "../../../../components/TextFontTitillium";

import ButtonGeneric from "../../../../components/ButtonGeneric";
import DrawerScreen from "../DrawerScreen/DrawerScreen";

class UserProfileScreen extends Component {
  _onPressDrawerToggle = () => {
    this.props.navigation.navigate("DrawerToggle");
  };

  componentDidMount() {
    const userID = this.props.user.userID;
    console.log("USER IS ", this.props.user);
    console.log("USER ID IS ", userID);
    //this.props.getUserData(userID);
  }

  render() {
    return (
      <View style={styles.layoutStyle}>
        <View style={styles.profileImageContainer}>
          <Image
            source={require("../../../../assets/images/mountain-and-shoes.jpeg")}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.titleContainer}>
          <TextFontTitillium style={styles.titleStyle}>
            User Profile!
          </TextFontTitillium>
        </View>
        <View style={{ flex: 4 }}>
          <ScrollView style={{ flex: 10 }}>
            <TextFontTitillium>
              User Email Is: {this.props.user.userEmail}
            </TextFontTitillium>
            <TextFontTitillium>
              User Age Range Is: {this.props.user.userAge}
            </TextFontTitillium>
            <TextFontTitillium>
              User City Is: {this.props.user.userCity}
            </TextFontTitillium>
            <TextFontTitillium>
              eparate package called redux-thunk. Well explain how middleware
              works in general later; for now, there is just one important thing
              you need to know: by using this specific middleware, an action
              creator can return a function instead of an action object. This
              way, the action creator becomes a thunk. When an action creator
              returns a function, that function will get executed by the Redux
              Thunk middleware. This function doesn't need to be pure; it is
              thus allowed to have side effects, including executing
              asynchronous API calls. The function can also dispatch
              actions—like those synchronous actions we defined earlier.
            </TextFontTitillium>
          </ScrollView>
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
    width: 120,
    height: 120,
    borderRadius: 60
  },
  profileImageContainer: {
    width: SCREEN_WIDTH,
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  titleStyle: {
    fontSize: 25,
    color: commonColors.PINK
  },
  titleContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: commonColors.DARK_GREY,
    borderBottomWidth: 2,
    borderColor: commonColors.GREEN
  }
});

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  getUserData: inputObject => dispatch(actions.getUserData(inputObject))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen);
