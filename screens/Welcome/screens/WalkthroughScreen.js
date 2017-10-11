import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import { SCREEN_WIDTH } from '../../../styles/dimensions';

const WALKTHROUGH_DATA = [
{ text: 'Welcome to the Givertrail Project', color: '#03A9F4' },
{ text: 'Where every step makes the World Better', color: '#009688' },
{ text: 'Sign Up now and Make a Difference', color: '#03A9F4' }
];

class WalkthroughScreen extends Component {

  renderLastWalkthroughScreen(index) {
    if (index === WALKTHROUGH_DATA.length - 1) {
      return (
        <View>
          <TouchableHighlight
            onPress={() => {this.props.navigation.navigate('signup')}}
            style={{width: 300, height: 100, backgroundColor: 'blue'}}
            underlayColor='green'>
            <Text>Go to Sign Up!</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {this.props.navigation.navigate('login')}}
            style={{width: 300, height: 100, backgroundColor: 'blue'}}
            underlayColor='green'>
            <Text>Go to Login!</Text>
          </TouchableHighlight>
        </View>

      );
    }
  }

  renderWalkthrough() {
    return WALKTHROUGH_DATA.map((page, index) => {
      return (
        <View
          key={page.text}
          style={[styles.layoutStyle, { backgroundColor: page.color }]}
        >
          <Text style={styles.textStyle}>{page.text}</Text>
          {this.renderLastWalkthroughScreen(index)}
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView
        horizontal
        style={{ flex: 1 }}
        pagingEnabled
      >
        {this.renderWalkthrough()}
      </ScrollView>
    );
  }
}

const styles = {
  layoutStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  textStyle: {
    fontSize: 30,
    color: 'white'
  },
};

export default WalkthroughScreen;
