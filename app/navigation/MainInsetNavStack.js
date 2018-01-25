"use strict";

import React, { Component } from "react";
import { Text, View } from "react-native";
import {
    StackNavigator,
    TabNavigator,
    DrawerNavigator
} from "react-navigation";
import { connect } from "react-redux";

import UserProfileScreen from "../screens/Main/screens/UserProfileScreen/UserProfileScreen";
import MapScreen from "../screens/Main/screens/MapScreen/MapScreen";
//import BackgroundGeoPage from "../screens/Main/screens/MapScreen/BackgroundGeoPage"
import StatisticsScreen from "../screens/Main/screens/StatisticsScreen/StatisticsScreen";
import CauseListScreen from "../screens/Main/screens/CauseListScreen/CauseListScreen";
import CauseDetailScreen from "../screens/Main/screens/CauseDetailScreen/CauseDetailScreen";
import DrawerScreen from "../screens/Main/screens/DrawerScreen/DrawerScreen";
import MenuIcon from "../screens/Main/screens/DrawerScreen/MenuIcon";
import CustomTabBar from "../components/CustomTabBar";

import { headerStyle } from "../styles/mainInsetHeaderStyle";
import commonColors from "../constants/colors";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/dimensions";

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
                                                screen: CauseListScreen,
                                                title: "CAUSE LIST"
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
                                tabBarComponent: ({ navigation }) => (
                                    <CustomTabBar navigation={navigation} />
                                ),
                                animationEnabled: false,
                                swipeEnabled: false,
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
                                        //justifyContent: "center",
                                        //alignItems: "center"
                                    }
                                }
                            }
                        )
                    }
                },
                {
                    //StackNavigator Navigation Options
                    navigationOptions: ({ navigation }) => ({
                        title:
                            typeof navigation.state.params === "undefined" ||
                            typeof navigation.state.params.title === "undefined"
                                ? "User Profile"
                                : navigation.state.params.title,
                        headerStyle: headerStyle,
                        headerTitleStyle: {
                            alignSelf: "center",
                            fontFamily: "TitilliumWeb-Light",
                            fontSize: 22,
                            color: commonColors.LIGHT_GREY
                        },
                        headerRight: <MenuIcon navigation={navigation} />,
                        headerLeft: (
                            <View style={{ flex: 0, width: 10, height: 100 }} />
                        )
                        // swipeEnabled: false,
                        // animationEnabled: false
                    })
                }
            )
        }
    },
    {
        //DrawerNavigator Navigation Options
        contentComponent: DrawerScreen,
        drawerWidth: SCREEN_WIDTH / 16 * 13,
        navigationOptions: {
            gesturesEnabled: false,
            swipeEnabled: false,
            animationEnabled: false
        }
    }
);

// const mapStateToProps = state => ({
//   mapUI: state.mapUI,
// });

// export default connect(mapStateToProps)(MainInsetNavStack);

export default MainInsetNavStack;
