"use strict";

import React, { Component } from "react";

import {
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/dimensions";
import commonColors from "../../../../constants/colors";

class ImageRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemSelected: false,
      animatedWidth: this.props.INNER_WIDTH,
      animatedHeight: this.props.INNER_WIDTH / 2,
      animatedOpacity: 0
    };
  }

  _onPressSelectItem = () => {
    this.setState(
      {
        itemSelected: !this.state.itemSelected
      },
      function() {
        this.state.itemSelected === true
          ? this.props.addToUserPassionsList(this.props.id)
          : this.props.removeFromUserPassionsList(this.props.id);

        if (this.state.itemSelected) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
          this.setState({
            animatedWidth: this.state.animatedWidth / 4 * 3,
            animatedHeight: this.state.animatedHeight / 4 * 3,
            animatedOpacity: 1
          });
        } else {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          this.setState({
            animatedWidth: this.props.INNER_WIDTH,
            animatedHeight: this.props.INNER_WIDTH / 2,
            animatedOpacity: 0
          });
        }
      }
    );
  };

  render() {
    const INNER_WIDTH = this.props.INNER_WIDTH;
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={this._onPressSelectItem}
        >
          <Image
            source={this.props.image}
            style={{
              width: this.state.animatedWidth,
              height: this.state.animatedHeight
            }}
          />
        </TouchableWithoutFeedback>
        <View style={styles.checkContainer}>
          <View style={{ opacity: this.state.animatedOpacity }}>
            <Icon size={40} name="check" color={commonColors.GREEN} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  checkContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ImageRow;
