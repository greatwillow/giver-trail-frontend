"use strict";

import React, { Component } from "react";

import { FlatList, Modal, StyleSheet, Text, View } from "react-native";

import ListItem from "./ListItem";
import ButtonGeneric from "../../../../../components/ButtonGeneric";

const data = [
  {
    id: 10,
    key: 1,
    title: "dogs"
  },
  {
    id: 9,
    key: 2,
    title: "cats"
  },
  {
    id: 8,
    key: 3,
    title: "squirrels"
  }
];

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

  _onPressCloseModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  render() {
    return (
      <View>
        <Modal visible={this.state.modalVisible}>
          <Text>Province Modal!</Text>
          <FlatList
            data={data}
            renderItem={({ item }) => <Text>{item.title}</Text>}
          />
          <ButtonGeneric onPress={this._onPressCloseModal} />
        </Modal>
      </View>
    );
  }
}

export default ModalList;
