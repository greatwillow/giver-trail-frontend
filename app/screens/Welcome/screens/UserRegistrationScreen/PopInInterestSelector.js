"use strict";

import React, { Component } from "react";

import { FlatList, Modal, StyleSheet, Text, View } from "react-native";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/dimensions";
import commonColors from "../../../../constants/colors";
import interestImageData from "../../../../assets/pureData/interestImageData";
import GenericButton from "../../../../components/GenericButton";
import TextFontTitillium from "../../../../components/TextFontTitillium";

import ImageRow from "./ImageRow";

const INNER_WIDTH = SCREEN_WIDTH / 12 * 11;

class PopInInterestSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userPassionsList: []
    };
  }
  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => (
    <ImageRow
      {...this.props}
      id={item.id}
      title={item.title}
      image={item.image}
      INNER_WIDTH={INNER_WIDTH}
    />
  );

  render() {
    return (
      <View style={[styles.innerContainer, this.props.style]}>
        <View style={styles.listContainer}>
          <FlatList
            data={interestImageData}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>
        <View style={{ flex: 2, padding: 20 }}>
          <TextFontTitillium
            style={{
              fontSize: 15,
              textAlign: "center",
              lineHeight: 40
            }}
          >
            Select
            <Text style={{ color: commonColors.PINK, fontSize: 20 }}> 3 </Text>
            Or More Images That Best
            <Text style={{ color: "black" }}> Describe Your</Text>
            <Text style={{ color: commonColors.PINK, fontSize: 20 }}>
              {" "}
              Passion!
            </Text>
          </TextFontTitillium>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: SCREEN_WIDTH / 6 * 5,
    height: SCREEN_HEIGHT / 8 * 5,
    backgroundColor: "rgba(0,0,0,0)",
    borderColor: commonColors.GREEN,
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 30,
    overflow: "hidden"
  },
  listContainer: {
    flex: 5,
    backgroundColor: commonColors.DARK_GREY,
    borderColor: commonColors.GREEN
  }
});

export default PopInInterestSelector;
