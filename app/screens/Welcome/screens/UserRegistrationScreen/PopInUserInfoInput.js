"use strict";

import React, { Component } from "react";

import {
    FlatList,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    KeyboardAvoidingView
} from "react-native";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../../../constants/dimensions";
import commonColors from "../../../../constants/colors";

import GenericListItem from "../../../../components/GenericListItem";
import GenericButton from "../../../../components/GenericButton";
import TextFontTitillium from "../../../../components/TextFontTitillium";
import TextInputSingleLine from "../../../../components/TextInputSingleLine";

class PopInUserInfoInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userFirstName: null,
            userLastName: null,
            userFirstNameValid: true,
            userLastNameValid: true,
            showFirstNameInvalidUI: false,
            showLastNameInvalidUI: false
        };
    }

    _handleFirstNameChangeText = input => {
        input.length <= 2
            ? this.setState({ userFirstNameValid: false, userFirstName: input })
            : this.setState({ userFirstNameValid: true, userFirstName: input });
    };

    _handleFirstNameSubmit = () => {
        this.state.userFirstNameValid
            ? this.setState({ showFirstNameInvalidUI: false })
            : this.setState({ showFirstNameInvalidUI: true });
    };

    _handleLastNameChangeText = input => {
        input.length <= 2
            ? this.setState({ userLastNameValid: false, userLastName: input })
            : this.setState({ userLastNameValid: true, userLastName: input });
    };

    _handleLastNameSubmit = () => {
        this.state.userFirstNameValid
            ? this.setState({ showLastNameInvalidUI: false })
            : this.setState({ showLastNameInvalidUI: true });
    };

    _handleAgeSubmit = item => {
        this.props.setUserAge(item.key);
        this.selected = true;
    };

    _onRequestClose = () => {
        if (
            this.state.userFirstName &&
            this.state.userLastName &&
            this.state.userFirstNameValid &&
            this.state.userLastNameValid
        ) {
            this.props.setUserFirstName(this.state.userFirstName);
            this.props.setUserLastName(this.state.userLastName);
            this.props.setUserInfoInputFinished(true);
        } else {
            this.props.setUserInfoInputFinished(false);
            this.setState({
                showFirstNameInvalidUI: true,
                showLastNameInvalidUI: true
            });
        }
    };

    _renderListItem = ({ item }) => {
        return (
            <GenericListItem
                ref="list"
                id={item.key}
                title={item.title}
                selected={false}
                onPress={this._handleAgeSubmit.bind(this, item)}
            />
        );
    };

    render() {
        return (
            <View style={[styles.movingContainer, this.props.style]}>
                <View style={styles.innerTopContainer}>
                    <View style={styles.textContainer}>
                        <TextFontTitillium style={styles.standardText}>
                            First Name
                            {this.state.showFirstNameInvalidUI ? (
                                <Text style={{ color: "red" }}>
                                    {"   "}Need First Name!
                                </Text>
                            ) : null}
                        </TextFontTitillium>
                        <TextInputSingleLine
                            style={styles.standardTextInput}
                            onChangeText={this._handleFirstNameChangeText}
                            onEndEditing={this._handleFirstNameSubmit}
                        />
                        <TextFontTitillium style={styles.standardText}>
                            Last Name
                            {this.state.showLastNameInvalidUI ? (
                                <Text style={{ color: "red" }}>
                                    {"   "}Need Last Name!
                                </Text>
                            ) : null}
                        </TextFontTitillium>
                        <TextInputSingleLine
                            style={styles.standardTextInput}
                            onChangeText={this._handleLastNameChangeText}
                            onEndEditing={this._handleLastNameSubmit}
                            onSubmitEditing={this.props.onSubmitEditing}
                        />
                    </View>
                </View>
                <View style={styles.innerBottomContainer} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    movingContainer: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        flex: 0,
        width: SCREEN_WIDTH / 6 * 5,
        height: SCREEN_HEIGHT / 8 * 5,
        backgroundColor: "rgba(0,0,0,0)"
    },
    innerTopContainer: {
        flex: 9,
        width: SCREEN_WIDTH / 6 * 5,
        borderColor: commonColors.GREEN,
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: "rgba(0,0,0,0)",
        paddingBottom: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    innerBottomContainer: {
        flex: 11,
        width: SCREEN_WIDTH / 6 * 5,
        backgroundColor: "rgba(0,0,0,0)"
    },
    textContainer: {
        flex: 1,
        justifyContent: "space-between",
        width: SCREEN_WIDTH / 6 * 5 - 40,
        padding: 15
    },
    standardText: {
        fontSize: 15,
        textAlign: "left"
    },
    standardTextInput: {
        width: SCREEN_WIDTH / 6 * 5 - 40,
        borderColor: commonColors.DARK_GREY,
        borderWidth: 1
    }
});

export default PopInUserInfoInput;
