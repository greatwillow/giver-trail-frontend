'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';

class TestButton extends Component {
  render() {
    return (
      <View>
        <TouchableHighlight
          onPress={this.props.onPress}
          style={styles.button}
          underlayColor='green'>
          <Text style={styles.text}>
            {this.props.text}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    button: {
      width: 200,
      height: 50,
      backgroundColor: 'blue'
    },
    text: {
      fontSize: 20,
      color: 'white'
    }
});


export default TestButton;
