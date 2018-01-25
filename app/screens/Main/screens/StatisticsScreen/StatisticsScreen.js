import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import * as actions from "../../../../data/appActions";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/dimensions";
import commonColors from "../../../../constants/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class StatisticsScreen extends Component {
    render() {
        return (
            <View style={styles.layoutStyle}>
                <View
                    style={{
                        flex: 1,
                        width: SCREEN_WIDTH,
                        height: SCREEN_HEIGHT / 4,
                        backgroundColor: commonColors.DARK_GREY
                    }}
                >
                    <Text>Chart Window</Text>
                </View>

                <Text style={styles.textStyle}>Stats</Text>
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
    textStyle: {
        fontSize: 30,
        color: "red"
    }
});

export default StatisticsScreen;
