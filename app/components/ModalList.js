"use strict";

import React, { Component } from "react";

import { FlatList, Modal, StyleSheet, Text, View } from "react-native";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/dimensions";
import commonColors from "../constants/colors";
import ModalListItem from "./ModalListItem";
import ButtonGeneric from "./ButtonGeneric";

class ModalList extends Component {
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

  _renderListItem = ({ item }) => {
    return (
      <ModalListItem
        id={item.key}
        title={item.title}
        onPress={this.props.onPress}
      />
    );
  };

  render() {
    return (
      <View>
        <Modal visible={this.state.modalVisible}>
          <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
              <View style={styles.listContainer}>
                <FlatList
                  style={styles.flatList}
                  data={this.props.data}
                  renderItem={this._renderListItem}
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
    width: SCREEN_WIDTH / 6 * 5,
    height: SCREEN_HEIGHT / 2,
    backgroundColor: commonColors.GREEN,
    borderRadius: 10
  },
  listContainer: {
    backgroundColor: "white",
    width: SCREEN_WIDTH / 6 * 5 - 40,
    height: SCREEN_HEIGHT / 2 - 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  flatList: {
    margin: 20,
    width: SCREEN_WIDTH / 6 * 5 - 70,
    height: SCREEN_HEIGHT / 2 - 70
  }
});

export default ModalList;
