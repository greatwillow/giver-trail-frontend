'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

class DrawerComponent extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.text}>
          This is the Drawer!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow'
  },
  text: {
    color: 'green'
  }

});


export default DrawerComponent;
