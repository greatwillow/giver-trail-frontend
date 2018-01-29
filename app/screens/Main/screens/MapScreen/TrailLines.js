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
        const linesArray = this.props.trails.trails.map((trail, index) => {
            let lineString = {};
            if (trail.coordinates.length >= 2) {
                lineString = makeLineString(trail.coordinates, {
                    id: shortid.generate()
                });
            }
            if (index === this.props.trails.trails.length - 1) {
                console.log("LINES DONE LOADING");
                console.log("LINES DONE LOADING");
                console.log("LINES DONE LOADING");
            }

            return (
                <MapboxGL.ShapeSource
                    key={shortid.generate()}
                    id={shortid.generate()}
                    shape={lineString}
                >
                    <MapboxGL.LineLayer
                        id={shortid.generate()}
                        style={layerStyles.trailLine}
                    />
                </MapboxGL.ShapeSource>
            );
        });

        return linesArray;
    }
}

const layerStyles = MapboxGL.StyleSheet.create({
    trailLine: {
        lineColor: commonColors.DARK_GREY,
        lineWidth: 5,
        lineOpacity: 0.5
    }
});

export default TrailLines;
