"use strict";

import { React } from "react";
import { Text, View } from "react-native";
import {
  StackNavigator,
  TabNavigator,
  DrawerNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import UserProfileScreen from "../screens/Main/screens/UserProfileScreen/UserProfileScreen";
import MapScreen from "../screens/Main/screens/MapScreen/MapScreen";
import StatisticsScreen from "../screens/Main/screens/StatisticsScreen/StatisticsScreen";
import CauseListScreen from "../screens/Main/screens/CauseListScreen/CauseListScreen";
import CauseDetailScreen from "../screens/Main/screens/CauseDetailScreen/CauseDetailScreen";
import DrawerScreen from "../screens/Main/screens/DrawerScreen/DrawerScreen";

import { headerStyle, headerRight } from "../styles/mainInsetHeaderStyle";
import commonColors from "../styles/colors";
import { SCREEN_HEIGHT } from "../styles/dimensions";

const MainInsetNavStack = DrawerNavigator(
  {
    drawer: {
      headerMode: "none",
      screen: StackNavigator(
        {
          tabs: {
            screen: TabNavigator(
              {
                userProfile: { screen: UserProfileScreen },
                map: { screen: MapScreen },
                statistics: { screen: StatisticsScreen },
                causes: {
                  screen: StackNavigator(
                    {
                      causeList: {
                        screen: CauseListScreen
                      },
                      causeDetail: {
                        screen: CauseDetailScreen
                      }
                    },
                    {
                      headerMode: "none"
                    }
                  )
                }
              },
              {
                //TabNavigator Navigation Options
                tabBarPosition: "bottom",
                animationEnabled: true,
                tabBarOptions: {
                  activeTintColor: "#e91e63",
                  style: {
                    backgroundColor: commonColors.DARK_GREY,
                    height: SCREEN_HEIGHT / 6
                  },
                  labelStyle: {
                    fontSize: 15,
                    paddingBottom: 45
                  },
                  tabStyle: {
                    justifyContent: "center",
                    alignItems: "center"
                  }
                }
              }
            )
          }
        },
        {
          //StackNavigator Navigation Options
          navigationOptions: {
            headerStyle: headerStyle,
            headerRight: headerRight
          }
        }
      )
    }
  },
  {
    //DrawerNavigator Navigation Options
    contentComponent: DrawerScreen,
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default MainInsetNavStack;
