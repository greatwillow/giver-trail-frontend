'use strict';

import React, { Component } from 'react';

import { SCREEN_WIDTH } from '../../../../constants/dimensions';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

class MapScreen extends Component {
  render() {
    return (
      <View style={styles.layoutStyle}>
        <Text style={styles.textStyle}>
          Map!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layoutStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  textStyle: {
    fontSize: 30,
    color: 'red'
  },
});


export default MapScreen;
