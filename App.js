'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import WalkthroughScreen from './screens/Welcome/screens/WalkthroughScreen';
import LoginScreen from './screens/Main/screens/Login/LoginScreen';
import SignupScreen from './screens/Main/screens/Signup/SignupScreen';
import UserRegistrationScreen from './screens/Main/screens/UserRegistration/UserRegistrationScreen';

// class MainScreen extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//         <Text>Changes you make will automatically reload.</Text>
//         <Text>Shake your phone to open the developer menu.</Text>
//         <TouchableOpacity
//             style={{width: 300, height: 100}}
//             onPress={() => {this.props.navigation.navigate('walkthrough')}}
//            >
//           <Text>Welcome Page</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

const MainNavigator = StackNavigator({
  // main: { screen: MainScreen },
  walkthrough: { screen: WalkthroughScreen },
  login: { screen: LoginScreen },
  signup: { screen: SignupScreen },
  registration: { screen: UserRegistrationScreen },

});

export default MainNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   ActivityIndicator,
//   ListView,
// } from 'react-native';
//
//
// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoading: true
//     }
//   }
//   //Comment
//
//   componentDidMount() {
//     return fetch('https://facebook.github.io/react-native/movies.json')
//       .then((response) => response.json())
//       .then((responseJson) => {
//         let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//         this.setState({
//           isLoading: false,
//           dataSource: ds.cloneWithRows(responseJson.movies),
//         }, function() {
//           // do something with new state
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }
//   render() {
//     if (this.state.isLoading) {
//       return (
//         <View style={{flex: 1, paddingTop: 20}}>
//           <ActivityIndicator />
//         </View>
//       );
//     }
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to IOS React Native Greg!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.ios.js
//         </Text>
//         <Text style={styles.instructions}>
//           Press Cmd+R to reload,{'\n'}
//           Cmd+D or shake for dev menu
//         </Text>
//         <View style={{flex: 1, paddingTop: 20}}>
//           <ListView
//             dataSource={this.state.dataSource}
//             renderRow={(rowData) => <Text>{rowData.title}, {rowData.releaseYear}</Text>}
//           />
//         </View>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
