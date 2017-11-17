"use strict";

import React, { Component } from "react";

import { SCREEN_WIDTH } from "../../../../constants/dimensions";

import { Platform, StyleSheet, Text, TouchableHighlight, View } from "react-native";

import { Constants, Location, Permissions } from 'expo';

class StatisticsScreen extends Component {
  // state = {
  //   location: null,
  //   errorMessage: null,
  // };

  // componentWillMount() {
  //   if (Platform.OS === 'android' && !Constants.isDevice) {
  //     this.setState({
  //       errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
  //     });
  //   } else {
  //     this._getLocationAsync();
  //   }
  // }

  // _getLocationAsync = async () => {
  //   let { status } = await Permissions.askAsync(Permissions.LOCATION);
  //   if (status !== 'granted') {
  //     this.setState({
  //       errorMessage: 'Permission to access location was denied',
  //     });
  //   }

  //   let location = await Location.getCurrentPositionAsync({});
  //   this.setState({ location });
  // };

  render() {
    // let text = 'Waiting..';
    // if (this.state.errorMessage) {
    //   text = this.state.errorMessage;
    // } else if (this.state.location) {
    //   text = JSON.stringify(this.state.location);
    // }

    return (
      <View style={styles.layoutStyle}>
        <Text style={styles.textStyle}>Statistics!</Text>
        <TouchableHighlight
          onPress={() => this._getTrailApiData()}
          style={{ width: 300, height: 100, backgroundColor: "blue" }}
          underlayColor="green"
        >
          <Text>Go to User Registration!</Text>
        </TouchableHighlight>
        {/* <View style={styles.container}>
        <Text style={styles.paragraph}>{text}</Text>
      </View> */}
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
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  }
});

export default StatisticsScreen;
