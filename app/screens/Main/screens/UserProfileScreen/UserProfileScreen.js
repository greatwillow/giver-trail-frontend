"use strict";

import { connect } from "react-redux";
import * as actions from "../../../../data/appActions";

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SCREEN_WIDTH } from "../../../../constants/dimensions";

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
    this.props.getUserData(userID);
  }

  render() {
    return (
      <View style={styles.layoutStyle}>
        <Text style={styles.textStyle}>User Profile!</Text>
        <Text>User Email Is: {this.props.user.userEmail}</Text>
        <Text>User Age Range Is: {this.props.user.userAge}</Text>
        <Text>User City Is: {this.props.user.userCity}</Text>
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
  textStyle: {
    fontSize: 30,
    color: "red"
  }
});

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  getUserData: inputObject => dispatch(actions.getUserData(inputObject))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen);
