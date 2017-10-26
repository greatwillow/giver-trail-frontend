"use strict";

import React, { Component } from "react";

import { FlatList, Modal, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import * as actions from "../../../../data/appActions";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/dimensions";
import commonColors from "../../../../constants/colors";
import interestImageData from "../../../../assets/pureData/interestImageData";
import ButtonGeneric from "../../../../components/ButtonGeneric";
import TextFontTitillium from "../../../../components/TextFontTitillium";

import ImageRow from "./ImageRow";

const INNER_WIDTH = SCREEN_WIDTH / 12 * 11;

class ModalInterestSelector extends Component {
  _keyExtractor = (item, index) => item.id;

  _onRequestClose = () => {
    this.props.modalInterestSelector(false);
  };

  _onPressCloseModal = () => {
    this.props.modalInterestSelector(false);
  };

  _renderItem = ({ item }) => (
    <ImageRow
      id={item.id}
      title={item.title}
      image={item.image}
      INNER_WIDTH={INNER_WIDTH}
    />
  );

  render() {
    return (
      <View>
        <Modal
          visible={this.props.modalUI.modalInterestSelector}
          onRequestClose={this._onRequestClose}
        >
          <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
              <View style={{ flex: 2, padding: 20 }}>
                <TextFontTitillium
                  style={{
                    fontSize: 20,
                    textAlign: "center",
                    lineHeight: 50
                  }}
                >
                  Select
                  <Text style={{ color: commonColors.PINK, fontSize: 25 }}>
                    {" "}
                    3{" "}
                  </Text>
                  Or More Images That Best
                  <Text style={{ color: commonColors.GREEN }}>
                    {" "}
                    Describe Your
                  </Text>
                  <Text style={{ color: commonColors.PINK, fontSize: 25 }}>
                    {" "}
                    Passion!
                  </Text>
                </TextFontTitillium>
              </View>
              <View style={styles.listContainer}>
                <FlatList
                  data={interestImageData}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderItem}
                />
              </View>
              <View style={{ flex: 2 }}>
                <ButtonGeneric
                  style={{
                    margin: 20,
                    marginTop: 30,
                    borderColor: commonColors.GREEN
                  }}
                  text={"Submit Selection"}
                  onPress={this._onPressCloseModal}
                />
              </View>
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
    backgroundColor: "white",
    borderRadius: 10
  },
  listContainer: {
    flex: 6,
    backgroundColor: commonColors.DARK_GREY,
    borderColor: commonColors.GREEN,
    borderTopWidth: 3,
    borderBottomWidth: 3
  }
});

const mapStateToProps = state => ({
  modalUI: state.modalUI
});
const mapDispatchToProps = dispatch => ({
  modalInterestSelector: visible =>
    dispatch(actions.modalInterestSelector(visible))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ModalInterestSelector
);
