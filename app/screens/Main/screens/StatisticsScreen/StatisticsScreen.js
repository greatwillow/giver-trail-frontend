import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import * as actions from "../../../../data/appActions";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/dimensions";
import commonColors from "../../../../constants/colors";
import TextFontTitillium from "../../../../components/TextFontTitillium";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PureChart from "../../../../utils/pure-chart/index";
import {
  activityPointsData,
  donationsData,
  leadersData
} from "../../../../assets/pureData/mockStatisticsData";

class StatisticsScreen extends Component {
  render() {
    return (
      <View style={styles.layoutStyle}>
        <ScrollView
          style={{
            flex: 1,
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT / 4,
            backgroundColor: commonColors.DARK_GREY
          }}
        >
          <View style={styles.sectionTitleContainer}>
            <View style={{ flex: 1 }}>
              <TextFontTitillium style={styles.sectionTitleText}>
                Points:
              </TextFontTitillium>
            </View>
            <View style={{ flex: 1 }}>
              <TextFontTitillium style={styles.leadStatText}>
                20500
              </TextFontTitillium>
            </View>
            <View style={{ flex: 1 }}>
              <TextFontTitillium style={styles.leadInfoText}>
                Total Points Gained
              </TextFontTitillium>
            </View>
          </View>
          <View style={styles.chartContainer}>
            <PureChart data={activityPointsData} type="line" />
            <View
              style={{
                position: "absolute",
                bottom: 10,
                right: 15
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <View
                  style={{
                    width: 10,
                    height: 30,
                    backgroundColor: commonColors.PINK
                  }}
                />
                <View
                  style={{
                    paddingLeft: 10,
                    justifyContent: "center"
                  }}
                >
                  <TextFontTitillium style={{ fontSize: 15, color: "white" }}>
                    Hiking Points:
                  </TextFontTitillium>
                  <TextFontTitillium style={{ fontSize: 25, color: "white" }}>
                    9000
                  </TextFontTitillium>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <View
                  style={{
                    width: 10,
                    height: 30,
                    backgroundColor: commonColors.GREEN
                  }}
                />
                <View
                  style={{
                    paddingLeft: 10,
                    justifyContent: "center"
                  }}
                >
                  <TextFontTitillium style={{ fontSize: 15, color: "white" }}>
                    Running Points:
                  </TextFontTitillium>
                  <TextFontTitillium style={{ fontSize: 25, color: "white" }}>
                    11500
                  </TextFontTitillium>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.sectionTitleContainer}>
            <View style={{ flex: 1 }}>
              <TextFontTitillium style={styles.sectionTitleText}>
                Donations:
              </TextFontTitillium>
            </View>
            <View style={{ flex: 1 }}>
              <TextFontTitillium style={styles.leadStatText}>
                9000
              </TextFontTitillium>
            </View>
            <View style={{ flex: 1 }}>
              <TextFontTitillium style={styles.leadInfoText}>
                Points You Donated
              </TextFontTitillium>
            </View>
          </View>
          <View style={styles.chartContainer}>
            <PureChart data={donationsData} type="bar" />

            <View
              style={{
                position: "absolute",
                bottom: 0,
                top: 0,
                right: 0,
                justifyContent: "center",
                alignItems: "center",
                padding: 10
              }}
            >
              <TextFontTitillium
                style={{
                  fontSize: 15,
                  color: "white",
                  textAlign: "center"
                }}
              >
                Cause Donations:
              </TextFontTitillium>
              <TextFontTitillium
                style={{
                  fontSize: 11,
                  color: "white",
                  textAlign: "center"
                }}
              >
                {"\n"}
                Cancer Research ~ 1000 {"\n"}
                Forest Conservation ~ 2500 {"\n"}
                Owl Conservation ~ 4000 {"\n"}
                Uganda Education ~ 1500
              </TextFontTitillium>
            </View>
          </View>

          <View style={styles.sectionTitleContainer}>
            <View style={{ flex: 1 }}>
              <TextFontTitillium style={styles.sectionTitleText}>
                Leaders:
              </TextFontTitillium>
            </View>
            <View style={{ flex: 1 }}>
              <TextFontTitillium style={styles.leadStatText}>
                3534000
              </TextFontTitillium>
            </View>
            <View style={{ flex: 1 }}>
              <TextFontTitillium style={styles.leadInfoText}>
                Total Points Donated
              </TextFontTitillium>
            </View>
          </View>
          <View style={styles.chartContainer}>
            <PureChart data={leadersData} type="line" />
            <View
              style={{
                position: "absolute",
                bottom: 0,
                top: 0,
                right: 0,
                justifyContent: "center",
                alignItems: "center",
                padding: 15
              }}
            >
              <TextFontTitillium
                style={{
                  fontSize: 15,
                  color: "white",
                  textAlign: "center"
                }}
              >
                Donation Leaders:
              </TextFontTitillium>
              <TextFontTitillium
                style={{
                  fontSize: 11,
                  color: "white",
                  textAlign: "center"
                }}
              >
                {"\n"}
                John Doe ~ 7500 {"\n"}
                Jane Smith ~ 5000 {"\n"}
                Sarah Johnson ~ 9000 {"\n"}
              </TextFontTitillium>
            </View>
          </View>
          <View style={styles.sectionTitleContainer} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layoutStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH
  },
  sectionTitleText: {
    fontSize: 20,
    color: commonColors.LIGHT_GREY,
    textAlign: "left",
    paddingLeft: 20
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: SCREEN_WIDTH,
    backgroundColor: "black",
    borderBottomWidth: 2, //StyleSheet.hairlineWidth,
    borderColor: commonColors.PINK
  },
  chartContainer: { paddingTop: 25, paddingBottom: 20 },
  leadStatText: {
    fontSize: 30,
    color: commonColors.GREEN,
    textAlign: "center"
  },
  leadInfoText: {
    fontSize: 11,
    color: commonColors.LIGHT_GREY,
    textAlign: "right",
    paddingRight: 20
  }
});

export default StatisticsScreen;
