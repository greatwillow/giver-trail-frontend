import _ from "lodash";
import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import commonColors from "../../constants/colors";

const SINGLE_SERIES_WITH_NUMBERS = 0;
const SINGLE_SERIES_WITH_OBJECTS = 1;
const MULTI_SERIES = 2;

function flattenData(data) {
    let numberCount = 0;
    let objectWithYCount = 0;
    let multiSeriesCount = 0;
    let length = data.length;
    data.map(obj => {
        if (typeof obj === "number") {
            numberCount++;
        } else if (typeof obj === "object") {
            if (typeof obj.y === "number") {
                objectWithYCount++;
            } else if (Array.isArray(obj.data)) {
                multiSeriesCount++;
            }
        }
    });

    if (numberCount === length || objectWithYCount === length) {
        return [
            {
                seriesName: "",
                data: data
            }
        ];
    } else if (multiSeriesCount === length) {
        return data;
    } else {
        return [
            {
                seriesName: "",
                data: []
            }
        ];
    }
}

function getMaxValue(data) {
    let values = [];

    data.map(value => {
        if (typeof value === "number") {
            values.push(value);
        } else if (typeof value === "object") {
            if (typeof value.y === "number") {
                values.push(value.y);
            } else if (Array.isArray(value.data)) {
                value.data.map(v => {
                    if (typeof v === "number") {
                        values.push(v);
                    } else if (
                        typeof v === "object" &&
                        typeof v.y === "number"
                    ) {
                        values.push(v.y);
                    }
                });
            }
        }
    });

    if (values.length === 0) return 0;

    return Math.max.apply(null, values);
}

export const initData = (dataProp, height, gap) => {
    let guideArray, max, sortedData;
    if (!dataProp || !Array.isArray(dataProp) || dataProp.length === 0) {
        return {
            sortedData: [],
            max: 0,
            guideArray: []
        };
    }

    max = getMaxValue(dataProp);
    guideArray = getGuideArray(max, height);

    dataProp = flattenData(dataProp);

    sortedData = refineData(dataProp, max, height, gap);
    return {
        sortedData: sortedData,
        max: max,
        selectedIndex: null,
        nowHeight: 200,
        nowWidth: 200,
        scrollPosition: 0,
        nowX: 0,
        nowY: 0,
        guideArray: guideArray
    };
};

export const refineData = (flattenData, max, height, gap) => {
    let result = [];

    flattenData.map(series => {
        let dataProp = series.data;
        let object = {
            seriesName: series.seriesName,
            seriesColor: series.color
        };
        let data = [];
        let length = dataProp.length;
        let simpleTypeCount = 0;
        let objectTypeCount = 0;

        for (let i = 0; i < length; i++) {
            let maxClone = max;

            if (maxClone === 0) {
                maxClone = 1;
            }
            let dataObject = {};

            if (typeof dataProp[i] === "number") {
                simpleTypeCount++;
                dataObject.ratioY = dataProp[i] / maxClone * height;
                dataObject.y = dataProp[i];
                dataObject = {
                    gap: i * gap,
                    ratioY: dataProp[i] / maxClone * height,
                    y: dataProp[i]
                };
            } else if (typeof dataProp[i] === "object") {
                if (typeof dataProp[i].y === "number" && dataProp[i].x) {
                    objectTypeCount++;
                    dataObject = {
                        gap: i * gap,
                        ratioY: dataProp[i].y / maxClone * height,
                        x: dataProp[i].x,
                        y: dataProp[i].y
                    };
                }
            }
            data.push(dataObject);
        }

        // validation
        let isValidate = false;
        if (simpleTypeCount === length || objectTypeCount === length) {
            isValidate = true;
        }

        if (isValidate) {
            object.data = data.sort((a, b) => {
                return a["gap"] - b["gap"];
                // return a[0] - b[0]
            });
        } else {
            object.data = [];
        }

        result.push(object);
    });

    return result;
};

export const getGuideArray = (max, height) => {
    console.log("getGuideArray", max, height);
    let x = parseInt(max);
    let arr = [];
    let length;
    let temp;
    let postfix = "";
    if (x > -1 && x < 1000) {
        x = Math.round(x * 10);
        temp = 1;
    } else if (x >= 1000 && x < 1000000) {
        postfix = "K";
        x = Math.round(x / 100);
        temp = 1000;
    } else if (x >= 1000000 && x < 1000000000) {
        postfix = "M";
        x = Math.round(x / 100000);
        temp = 1000000;
    } else {
        postfix = "B";
        x = Math.round(x / 100000000);
        temp = 1000000000;
    }
    length = x.toString().length;

    x = _.round(x, -1 * length + 1) / 10;
    let first = parseInt(x.toString()[0]);

    if (first > -1 && first < 3) {
        // 1,2
        x = 2.5 * x / first;
    } else if (first > 2 && first < 6) {
        // 4,5
        x = 5 * x / first;
    } else {
        x = 10 * x / first;
    }

    for (let i = 1; i < 6; i++) {
        let v = x / 5 * i;
        console.log(v, temp, max, height);
        arr.push([v + postfix, v * temp / max * height]);
    }
    console.log("arr", arr);

    return arr;
};

export const drawYAxis = () => {
    return (
        <View
            style={{
                borderRightWidth: StyleSheet.hairlineWidth,
                borderColor: "#e0e0e0",
                width: StyleSheet.hairlineWidth,
                height: "100%",
                marginRight: 0
            }}
        />
    );
};

export const drawYAxisLabels = (arr, height) => {
    return (
        <View
            style={{
                width: 33,
                height: height,
                justifyContent: "flex-end",
                alignItems: "flex-end"
            }}
        >
            {arr.map((v, i) => {
                if (v[1] > height) return null;
                return (
                    <View
                        key={"guide" + i}
                        style={{
                            bottom: v[1] - 5,
                            position: "absolute"
                        }}
                    >
                        <Text style={{ fontSize: 11, color: "#FFFFFF" }}>
                            {v[0]}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
};
export const drawGuideLine = arr => {
    return (
        <View
            style={{
                width: "100%",
                height: "100%",

                position: "absolute"
            }}
        >
            {arr.map((v, i) => {
                return (
                    <View
                        key={"guide" + i}
                        style={{
                            width: "100%",
                            borderTopWidth: StyleSheet.hairlineWidth,
                            borderTopColor: "#e0e0e0",
                            bottom: v[1],
                            position: "absolute"
                        }}
                    />
                );
            })}
        </View>
    );
};

export const numberWithCommas = (x, summary = true) => {
    let postfix = "";
    if (summary) {
        if (x >= 1000 && x < 1000000) {
            postfix = "K";
            x = Math.round(x / 100) / 10;
        } else if (x >= 1000000 && x < 1000000000) {
            postfix = "M";
            x = Math.round(x / 100000) / 10;
        } else if (x >= 1000000000 && x < 1000000000000) {
            postfix = "B";
            x = Math.round(x / 100000000) / 10;
        }
    }

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + postfix;
};

export const drawXAxis = () => {
    return (
        <View
            style={{
                width: "100%",
                borderTopWidth: StyleSheet.hairlineWidth,
                borderTopColor: "#e0e0e0"
            }}
        />
    );
};
export const drawXAxisLabels = (sortedData, gap) => {
    return (
        <View
            style={{
                width: "100%",
                paddingVertical: 10,
                height: 10
            }}
        >
            {sortedData.map((data, i) => {
                // if (data[3] && i % 2 === 1) {
                if (data["x"] && i % 2 === 1) {
                    return (
                        <View
                            key={"label" + i}
                            style={{
                                position: "absolute",
                                // left: data[0] - gap / 2,
                                left: data["gap"] - gap / 2,
                                width: gap,
                                alignItems: "center"
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 9,
                                    color: "#FFFFFF"
                                }}
                            >
                                {
                                    // data[3]
                                    data["x"]
                                }
                            </Text>
                        </View>
                    );
                } else {
                    return null;
                }
            })}
        </View>
    );
};
