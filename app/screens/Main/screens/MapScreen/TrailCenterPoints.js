import React, { Component } from "react";
import MapboxGL from "@mapbox/react-native-mapbox-gl";
import shortid from "shortid";
import commonColors from "../../../../constants/colors";

class TrailCenterPoints extends Component {
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
        console.log("RENDERING ALL POINTS");
        console.log("====================================");
        return (
            <MapboxGL.ShapeSource
                id={shortid.generate()}
                cluster
                clusterRadius={50}
                clusterMaxZoom={14}
                //url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
                shape={this.props.generatedTrailPoints}
            >
                <MapboxGL.SymbolLayer
                    id="pointCount"
                    style={layerStyles.clusterCount}
                />
                <MapboxGL.CircleLayer
                    id={shortid.generate()} //"clusteredPoints"
                    belowLayerID="pointCount"
                    filter={["has", "point_count"]}
                    style={layerStyles.clusteredPoints}
                />

                <MapboxGL.CircleLayer
                    id={shortid.generate()} //"singlePoint"
                    filter={["!has", "point_count"]}
                    style={layerStyles.singlePoint}
                />
            </MapboxGL.ShapeSource>
        );
    }
}

const layerStyles = MapboxGL.StyleSheet.create({
    singlePoint: {
        circleColor: "green",
        circleOpacity: 1,
        circleStrokeWidth: 2,
        circleStrokeColor: "white",
        circleRadius: 10,
        circlePitchAlignment: MapboxGL.CirclePitchAlignment.Map
    },
    clusteredPoints: {
        circlePitchAlignment: MapboxGL.CirclePitchAlignment.Map,
        circleColor: MapboxGL.StyleSheet.source(
            [
                [3, "yellow"],
                [5, "red"],
                [7, "blue"],
                [10, "orange"],
                [15, "pink"],
                [100, "white"]
            ],
            "point_count",
            MapboxGL.InterpolationMode.Exponential
        ),

        circleRadius: MapboxGL.StyleSheet.source(
            [[0, 15], [3, 20], [5, 25], [7, 30], [10, 35]],
            "point_count",
            MapboxGL.InterpolationMode.Exponential
        ),

        circleOpacity: 1,
        circleStrokeWidth: 2,
        circleStrokeColor: "white"
    },
    clusterCount: {
        textField: "{point_count}",
        textSize: 18,
        textColor: commonColors.PINK,
        textPitchAlignment: MapboxGL.TextPitchAlignment.Map
    }
});

export default TrailCenterPoints;
