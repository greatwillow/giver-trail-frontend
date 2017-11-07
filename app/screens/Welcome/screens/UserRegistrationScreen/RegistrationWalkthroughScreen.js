"use strict";

import React, { Component } from "react";
import {
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Modal,
  StyleSheet,
  Text,
  View
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../../../../data/appActions";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/dimensions";
import commonColors from "../../../../constants/colors";
import PopInUserInfoInput from "./PopInUserInfoInput";
import PopInCitySearch from "./PopInCitySearch";
import PopInInterestSelector from "./PopInInterestSelector";

import NavArrows from "./NavArrows";
import ageData from "../../../../assets/pureData/ageData";
import TextFontTitillium from "../../../../components/TextFontTitillium";

class RegistrationWalkthroughScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfoInputItemLeft: 500,
      citySearchItemLeft: 500,
      interestSelectorItemLeft: 500
    };
  }

  createCustomLayoutAnimation = () => {
    const CustomLayoutAnimation = {
      duration: 700,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut
      }
    };
    return CustomLayoutAnimation;
  };

  componentDidMount() {
    window.setTimeout(() => {
      LayoutAnimation.configureNext(this.createCustomLayoutAnimation());
      this.setState({
        userInfoInputItemLeft: SCREEN_WIDTH / 6 * 0.5
      });
    }, 0);
  }

  _navForward = () => {
    if (this.props.registrationUI.chosenRegPage === "userInfoInput") {
      this.userInfoInputRef._onRequestClose();
      if (this.props.registrationUI.userInfoInputIsFinished === true) {
        this.props.setRegistrationUI("citySearch");
        LayoutAnimation.configureNext(this.createCustomLayoutAnimation());
        this.setState({
          userInfoInputItemLeft: -400,
          citySearchItemLeft: SCREEN_WIDTH / 6 * 0.5
        });
      }
    } else if (this.props.registrationUI.chosenRegPage === "citySearch") {
      this.props.setRegistrationUI("interestSelector");
      LayoutAnimation.configureNext(this.createCustomLayoutAnimation());
      this.setState({
        citySearchItemLeft: -400,
        interestSelectorItemLeft: SCREEN_WIDTH / 6 * 0.5
      });
    } else if (this.props.registrationUI.chosenRegPage === "interestSelector") {
      this.props.setRegistrationUI("userInfoInput");
      LayoutAnimation.configureNext(this.createCustomLayoutAnimation());
      this.setState({
        interestSelectorItemLeft: -400
      });
      this.props.navigation.navigate("drawer");
    }
  };

  _navBackward = () => {
    if (this.props.registrationUI.chosenRegPage === "userInfoInput") {
    } else if (this.props.registrationUI.chosenRegPage === "citySearch") {
      this.props.setRegistrationUI("userInfoInput");
      LayoutAnimation.configureNext(this.createCustomLayoutAnimation());
      this.setState({
        citySearchItemLeft: 500,
        userInfoInputItemLeft: SCREEN_WIDTH / 6 * 0.5
      });
    } else if (this.props.registrationUI.chosenRegPage === "interestSelector") {
      this.props.setRegistrationUI("citySearch");
      LayoutAnimation.configureNext(this.createCustomLayoutAnimation());
      this.setState({
        interestSelectorItemLeft: 500,
        citySearchItemLeft: SCREEN_WIDTH / 6 * 0.5
      });
    }
  };

  _renderCustomHeaderText() {
    if (this.props.registrationUI.chosenRegPage === "userInfoInput") {
      return (
        <TextFontTitillium style={styles.customHeaderText}>
          Whats Your Info?
        </TextFontTitillium>
      );
    } else if (this.props.registrationUI.chosenRegPage === "citySearch") {
      return (
        <TextFontTitillium style={styles.customHeaderText}>
          Whats Your Home Base?
        </TextFontTitillium>
      );
    } else if (this.props.registrationUI.chosenRegPage === "interestSelector") {
      return (
        <TextFontTitillium style={styles.customHeaderText}>
          What Are Your Adventure Interests?
        </TextFontTitillium>
      );
    }
  }

  render() {
    return (
      <View style={styles.layoutStyle}>
        <Image
          resizeMode="contain"
          source={require("../../../../assets/images/registrationImages/swiss-mountains-transparent-top.jpg")}
          style={{
            position: "absolute",
            left: 0,
            bottom: -250,
            width: SCREEN_WIDTH
          }}
        />
        <View style={styles.customHeader}>
          {this._renderCustomHeaderText()}
        </View>
        <View
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT / 8 * 5,
            marginTop: 20
          }}
        >
          <PopInUserInfoInput
            {...this.props}
            ref={ref => (this.userInfoInputRef = ref)}
            data={ageData}
            style={{
              position: "absolute",
              bottom: 0,
              left: this.state.userInfoInputItemLeft
            }}
          />
          <KeyboardAvoidingView behavior="padding">
            <PopInCitySearch
              {...this.props}
              style={{
                position: "absolute",
                bottom: -(SCREEN_HEIGHT / 8 * 5),
                left: this.state.citySearchItemLeft
              }}
            />
          </KeyboardAvoidingView>
          <PopInInterestSelector
            {...this.props}
            style={{
              position: "absolute",
              bottom: 0,
              left: this.state.interestSelectorItemLeft
            }}
          />
        </View>
        <NavArrows
          {...this.props}
          navForward={this._navForward}
          navBackward={this._navBackward}
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
    width: SCREEN_WIDTH,
    backgroundColor: "white"
  },
  customHeader: {
    borderBottomWidth: 2,
    borderColor: commonColors.PINK,
    width: SCREEN_WIDTH / 6 * 5,
    height: SCREEN_HEIGHT / 12 * 1,
    marginTop: SCREEN_HEIGHT / 24 * 1,
    padding: 20,
    marginLeft: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  customHeaderText: {
    textAlign: "center",
    color: commonColors.DARK_GREY,
    fontSize: 18
  },
  numberText: {
    fontSize: SCREEN_WIDTH / 12,
    color: commonColors.DARK_GREY,
    alignSelf: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => ({
  user: state.user,
  registrationUI: state.registrationUI
});
const mapDispatchToProps = dispatch => ({
  sendNewUserRegistrationData: inputObject =>
    dispatch(actions.sendNewUserRegistrationData(inputObject)),
  setUserAge: userAge => dispatch(actions.setUserAge(userAge)),
  setUserFirstName: userFirstName =>
    dispatch(actions.setUserFirstName(userFirstName)),
  setUserLastName: userLastName =>
    dispatch(actions.setUserLastName(userLastName)),
  setUserCity: userCity => dispatch(actions.setUserCity(userCity)),
  addToUserPassionsList: passionItem =>
    dispatch(actions.addToUserPassionsList(passionItem)),
  removeFromUserPassionsList: passionItem =>
    dispatch(actions.removeFromUserPassionsList(passionItem)),
  setRegistrationUI: chosenRegPage =>
    dispatch(actions.setRegistrationUI(chosenRegPage)),
  setUserInfoInputFinished: isFinished =>
    dispatch(actions.setUserInfoInputFinished(isFinished))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RegistrationWalkthroughScreen
);
