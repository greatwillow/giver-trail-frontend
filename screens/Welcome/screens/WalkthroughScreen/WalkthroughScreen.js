import React, { Component } from "react";
import {
  Dimensions,
  Image,
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import { SCREEN_WIDTH } from "../../../../styles/dimensions";
import { Font } from "expo";

import ButtonGeneric from "../../../../components/ButtonGeneric";

const WALKTHROUGH_DATA = [
  {
    key: 1,
    text: "Welcome to the Givertrail Project",
    color: "#03A9F4",
    backgroundImageFile: require("../../../../assets/images/girl-head-mountain.jpg")
  },
  {
    key: 2,
    text: "Where every step makes the World Better",
    color: "#009688",
    backgroundImageFile: require("../../../../assets/images/mountain-and-shoes.jpeg")
  },
  {
    key: 3,
    text: "Sign Up now and Make a Difference",
    color: "#03A9F4",
    backgroundImageFile: require("../../../../assets/images/bw-backpacker.jpeg")
  }
];

class WalkthroughScreen extends Component {
  state = {
    fontLoaded: false
  };
  async componentDidMount() {
    await Font.loadAsync({
      "titillium-light": require("../../../../assets/fonts/TitilliumWeb-Light.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  _onPressLogin = () => {
    this.props.navigation.navigate("login");
  };

  _onPressSignup = () => {
    this.props.navigation.navigate("signup");
  };

  renderLastWalkthroughScreen(index) {
    if (index === WALKTHROUGH_DATA.length - 1) {
      return (
        <View>
          <ButtonGeneric text={"Login!"} onPress={this._onPressLogin} />
          <ButtonGeneric text={"Signup!"} onPress={this._onPressSignup} />
        </View>
      );
    }
  }
  //--------------------------------POST-------------
  fetchRequestPostTest() {
    console.log("pressed post");

    const TEST_USER = {
      email: "fasdy@gmail.com",
      password: "12345678",
      pointsEarned: 7484
    };
    const USER_POST_URI =
      "https://damp-tor-16286.herokuapp.com/users/create-user";
    const USER_GET_URI = "https://damp-tor-16286.herokuapp.com/users/:id";

    return fetch(USER_POST_URI, {
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      }),
      method: "POST",
      body: JSON.stringify(TEST_USER)
    })
      .then(res => {
        console.log("response is: ", res);
        console.log(res.status);
        console.log(res.statusText);
        if (res.status == 200) {
          return res.json();
        } else {
          console.log(res.text());
          throw new Error("Something wrong with the server!");
        }
      })
      .then(data => {
        console.log("data is: ", data);
      })
      .catch(error => {
        console.error(error);
      });
  }
  //--------------------------------GET-------------
  fetchRequestGetTest() {
    console.log("pressed get");

    return fetch(USER_GET_URI, {
      method: "GET"
    })
      .then(response => {
        console.log("response is: ", response);
        console.log("Is ok?: ", response.ok);
        console.log("Status?: ", response.status);
        //console.log("JSON?: ",response.json());
        if (response.status == 200) return response.json();
        else throw new Error("Something wrong with the server!");
      })
      .then(data => {
        console.log("data is: ", data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  renderWalkthrough() {
    return WALKTHROUGH_DATA.map((page, index) => {
      return (
        <Image
          key={page.key}
          source={page.backgroundImageFile}
          style={styles.backgroundImage}
        >
          <Text
            style={[
              { fontFamily: this.state.fontLoaded ? "titillium-light" : null },
              styles.textStyle
            ]}
          >
            {page.text}
          </Text>
          {this.renderLastWalkthroughScreen(index)}
        </Image>
      );
    });
  }

  render() {
    return (
      <ScrollView horizontal style={{ flex: 1 }} pagingEnabled>
        {this.renderWalkthrough()}
      </ScrollView>
    );
  }
}

const styles = {
  backgroundImage: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: null,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center"
  },
  textStyle: {
    fontSize: 30,
    color: "black",
    backgroundColor: "rgba(0,0,0,0)",
    textAlign: "center"
  }
};

export default WalkthroughScreen;
