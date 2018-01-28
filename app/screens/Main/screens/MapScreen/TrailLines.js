import React, { Component } from "react";
import MapboxGL from "@mapbox/react-native-mapbox-gl";
import shortid from "shortid";
import { lineString as makeLineString } from "@turf/helpers";
import commonColors from "../../../../constants/colors";

class TrailLines extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.props.trails.trails.length === nextProps.trails.trails.length
        ) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        console.log("====================================");
        console.log("RENDERING ALL TRAILS");
        console.log("====================================");
        return this.props.trails.trails.map(trail => {
            let lineString = {};
            if (trail.coordinates.length >= 2) {
                lineString = makeLineString(trail.coordinates);
            }
            return (
                <MapboxGL.Animated.ShapeSource
                    id={shortid.generate()}
                    shape={lineString}
                >
                    <MapboxGL.Animated.LineLayer
                        id={shortid.generate()}
                        style={layerStyles.trailLine}
                    />
                </MapboxGL.Animated.ShapeSource>
            );
        });
    }
}

const layerStyles = MapboxGL.StyleSheet.create({
    trailLine: {
        lineColor: commonColors.DARK_GREY,
        lineWidth: 5,
        lineOpacity: 0.84
    }
});

export default TrailLines;
