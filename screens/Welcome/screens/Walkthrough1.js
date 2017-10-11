'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import commonStyles from '../../../styles/styles';
import commonColors from '../../../styles/colors';

class Walkthrough1 extends Component {
  render() {
    return (
      <View style={commonStyles.walkthroughLayout}>
        <Text style={commonStyles.walkthroughText}>
          Welcome!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});


export default Walkthrough1;
