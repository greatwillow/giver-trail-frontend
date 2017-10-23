"use strict";

import React, { Component } from "react";

import { FlatList, Modal, StyleSheet, Text, View } from "react-native";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/dimensions";
import commonColors from "../../../../constants/colors";
import interestImageData from "../../../../assets/pureData/interestImageData";
import ButtonGeneric from "../../../../components/ButtonGeneric";
import TextFontTitillium from "../../../../components/TextFontTitillium";

import ImageRow from "./ImageRow";

const INNER_WIDTH = SCREEN_WIDTH / 12 * 11;

class ModalImageSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: this.props.modalVisible
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      modalVisible: nextProps.modalVisible
    });
  }

  _keyExtractor = (item, index) => item.id;

  _onPressCloseModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  _renderItem = ({ item }) => (
    <ImageRow
      id={item.id}
      onPressItem={item => {
        this._onPressItem(item);
      }}
      title={item.title}
      image={item.image}
      INNER_WIDTH={INNER_WIDTH}
    />
  );

  render() {
    return (
      <View>
        <Modal
          visible={this.state.modalVisible}
          onRequestClose={this._onPressCloseModal}
        >
          <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
              <View style={{ borderBottomWidth: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    width: INNER_WIDTH - 10
                  }}
                >
                  <TextFontTitillium
                    style={{
                      fontSize: 15,
                      padding: 20,
                      alignSelf: "center"
                    }}
                  >
                    Which Images Best Describe Your Passion!
                  </TextFontTitillium>
                </View>
                <TextFontTitillium
                  style={{
                    fontSize: 20,
                    padding: 5,
                    paddingTop: 20,
                    paddingBottom: 20,
                    alignSelf: "center"
                  }}
                >
                  Select 3 or More!
                </TextFontTitillium>
              </View>
              <FlatList
                data={interestImageData}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
              />
              <ButtonGeneric
                style={{ margin: 20, marginTop: 30 }}
                text={"Make Selection"}
                onPress={this._onPressCloseModal}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: INNER_WIDTH,
    height: SCREEN_HEIGHT / 6 * 5,
    backgroundColor: commonColors.GREEN,
    borderRadius: 10
  }
});

export default ModalImageSelector;
