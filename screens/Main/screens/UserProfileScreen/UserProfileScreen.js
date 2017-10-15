'use strict';

import React, { Component } from 'react';

import { SCREEN_WIDTH } from '../../../../styles/dimensions';

import TestButton from '../../../../components/TestButton'
import Icon from 'react-native-vector-icons/Ionicons';


import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

class UserProfileScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'User Profile',
    drawerIcon: <Icon name="ios-person" size={30} color="#4F8EF7" />,
    headerMode: 'none',
  }
  render() {
    return (
      <View style={styles.layoutStyle}>
        <Text style={styles.textStyle}>
           User Profile!
        </Text>
        <TestButton onPress={() => {this.props.navigation.navigate('DrawerOpen')}} textInput={"open drawer"} />
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


export default UserProfileScreen;
