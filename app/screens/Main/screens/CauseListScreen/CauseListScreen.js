"use strict";

import React, { Component } from "react";
import {
  Animated,
  Image,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  UIManager,
  View,
  TouchableOpacity
} from "react-native";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/dimensions";
import commonColors from "../../../../constants/colors";
import TextFontTitillium from "../../../../components/TextFontTitillium";
import GenericButton from "../../../../components/GenericButton";

import Carousel from "react-native-snap-carousel";

import CAUSE_LIST_DATA from "../../../../assets/pureData/causeListData";

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class CauseListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemPressed: false,
      pageBackgroundImage: CAUSE_LIST_DATA[0].gradientCauseImage,
      pageBackgroundOpacity: new Animated.Value(0.3),
      buttonOpacity: new Animated.Value(0),
      itemWidth: SCREEN_WIDTH / 6 * 5,
      itemHeight: SCREEN_WIDTH / 6 * 4,
      itemImageHeight: SCREEN_WIDTH / 6 * 2,
      pageImageHeight: SCREEN_WIDTH / 6 * 3.5,
      innerTextContainerWidth: 0,
      innerTextContainerPadding: 0,
      pageDescriptionText: CAUSE_LIST_DATA[0].desription
    };
  }

  _onSnapToItem = index => {};

  _onScroll = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      itemWidth: SCREEN_WIDTH / 6 * 5,
      itemHeight: SCREEN_WIDTH / 6 * 4,
      itemImageHeight: SCREEN_WIDTH / 6 * 2,
      itemPressed: false
    });
  };

  _onPressSelectItem = () => {
    if (this.state.itemPressed) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({
        itemWidth: SCREEN_WIDTH / 6 * 5,
        itemHeight: SCREEN_WIDTH / 6 * 4,
        itemImageHeight: SCREEN_WIDTH / 6 * 2,
        pageImageHeight: SCREEN_WIDTH / 6 * 3.5,
        innerTextContainerWidth: 0,
        innerTextContainerPadding: 0,
        itemPressed: false
      });
      Animated.timing(this.state.pageBackgroundOpacity, {
        toValue: 0.3,
        duration: 1000
      }).start();
      Animated.timing(this.state.buttonOpacity, {
        toValue: 0,
        duration: 300
      }).start();
    } else {
      this.setState({
        pageBackgroundImage:
          CAUSE_LIST_DATA[this._carousel.currentIndex].gradientCauseImage,
        pageDescriptionText:
          CAUSE_LIST_DATA[this._carousel.currentIndex].description
      });
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({
        itemWidth: SCREEN_WIDTH / 6 * 5.01,
        itemHeight: SCREEN_WIDTH / 6 * 2,
        itemImageHeight: 0,
        pageImageHeight: SCREEN_WIDTH / 6 * 5.5,
        itemPressed: true,
        innerTextContainerWidth: SCREEN_WIDTH / 6 * 5,
        innerTextContainerPadding: 20
      });
      Animated.timing(this.state.pageBackgroundOpacity, {
        toValue: 1,
        duration: 1000
      }).start();
      Animated.timing(this.state.buttonOpacity, {
        toValue: 1,
        duration: 800
      }).start();
    }
  };

  // ============================ RENDERING =============================

  _renderCarousel = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback onPress={this._onPressSelectItem}>
        <View
          style={[
            styles.carouselContainer,
            {
              width: this.state.itemWidth,
              height: this.state.itemHeight
            }
          ]}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height:
                (this.state.itemHeight - this.state.itemImageHeight) * 2 / 3
            }}
          >
            <TextFontTitillium style={styles.carouselItemTitle}>
              {item.title}
            </TextFontTitillium>
          </View>
          <Image
            source={item.causeImage}
            style={{
              width: this.state.itemWidth,
              height: this.state.itemImageHeight
            }}
          />
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height:
                (this.state.itemHeight - this.state.itemImageHeight) * 1 / 3
            }}
          >
            <TextFontTitillium style={styles.carouselItemSubTitle1}>
              with{" "}
              <Text style={styles.carouselItemSubTitle2}>{item.company}</Text>
            </TextFontTitillium>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return (
      <View style={styles.layoutStyle}>

      {/* ============================ BACKGROUND ============================= */}

        <Animated.Image
          source={this.state.pageBackgroundImage}
          style={{
            height: this.state.pageImageHeight,
            width: SCREEN_WIDTH,
            opacity: this.state.pageBackgroundOpacity,
            position: "absolute",
            bottom: 0
          }}
          blurRadius={0}
        />
        <View
          style={{
            position: "absolute",
            top: SCREEN_WIDTH / 6 * 2 + 10,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Animated.View
            style={{
              flex: 1,
              alignSelf: "center",
              margin: 20,
              padding: this.state.innerTextContainerPadding,
              backgroundColor: "rgba(1,1,1,0.8)",
              width: this.state.innerTextContainerWidth,
              borderRadius: 10
            }}
          >

            {/* ============================ DESCRIPTION ============================= */}

            <ScrollView>
              <TextFontTitillium style={{ color: "#f6f6f6", fontSize: 15 }}>
                {"     "}
                {this.state.pageDescriptionText}
              </TextFontTitillium>
            </ScrollView>

            {/* ============================ BUTTONS ============================= */}

            <Animated.View
              style={{
                height: 60,
                flex: 0,
                flexDirection: "row",
                justifyContent: "space-around",
                opacity: this.state.buttonOpacity
              }}
            >
              <TouchableOpacity style={[styles.buttonStyle]}>
                <View>
                  <TextFontTitillium>Select This Cause</TextFontTitillium>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.buttonStyle]}>
                <View>
                  <TextFontTitillium>Share This Cause</TextFontTitillium>
                </View>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </View>

        {/* ============================ CAROUSEL ============================= */}

        <View
          style={{
            flex: 1,
            position: "absolute",
            top: 20
          }}
        >
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={CAUSE_LIST_DATA}
            renderItem={this._renderCarousel}
            sliderWidth={SCREEN_WIDTH}
            sliderHeight={SCREEN_WIDTH / 6 * 2}
            itemWidth={this.state.itemWidth}
            onSnapToItem={this._onSnapToItem}
          />
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  layoutStyle: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: SCREEN_WIDTH,
    backgroundColor: "black"
  },
  carouselContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f6f6",
    borderRadius: 10,
    overflow: "hidden",
    paddingBottom: 10
  },
  carouselItemTitle: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    padding: 15
  },
  carouselItemSubTitle1: {
    fontSize: 15,
    color: "black",
    textAlign: "right",
    backgroundColor: "rgba(0,0,0,0)",
    padding: 15
  },
  carouselItemSubTitle2: {
    fontSize: 20,
    color: commonColors.PINK,
    backgroundColor: "rgba(0,0,0,0)",
    padding: 15
  },
  textStyle: {
    fontSize: 30,
    color: "red"
  },
  buttonStyle: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: commonColors.GREEN,
    marginTop: 10,
    marginBottom: 0,
    width: SCREEN_WIDTH / 6 * 2,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5
  }
});

export default CauseListScreen;
