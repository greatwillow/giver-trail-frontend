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
{ text: 'Welcome hello to the Givertrail Project', color: '#03A9F4' },
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

  fetchRequestTest() {
    console.log('pressed');

    const testUser = {
      "_id": "ahsjkf32u4823n32nr2j3r",
      "email": "gregory@gmail.com",
      "password": "12345678",
      "firstName": "Gregory",
      "lastName": "Denys"
    }

    return fetch('https://damp-tor-16286.herokuapp.com/user/create-user', {method: 'POST', body: 'testUser'})
      .then(
        (response) => {
          if(response.status == 200) return response.json();
          else throw new Error('Something wrong with the server!');
      })
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  renderWalkthrough() {
    return WALKTHROUGH_DATA.map((page, index) => {
      return (
        <View
          key={page.text}
          style={[styles.layoutStyle, { backgroundColor: page.color }]}
        >
          <TouchableHighlight
            onPress={() => {this.fetchRequestTest()}}
            style={{width: 200, height: 60, backgroundColor: 'red'}}
            underlayColor='blue'>
              <Text>Fetch</Text>
          </TouchableHighlight>
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
    color: 'white',

  },
};

export default WalkthroughScreen;
