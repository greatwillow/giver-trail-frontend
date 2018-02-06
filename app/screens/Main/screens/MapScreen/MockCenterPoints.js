import React, { Component } from "react";
import MapboxGL from "@mapbox/react-native-mapbox-gl";
import shortid from "shortid";
import commonColors from "../../../../constants/colors";
import mockTrailCenterData from "../../../../assets/pureData/mockTrailCenterData";

class MockCenterPoints extends Component {
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
        return (
            <MapboxGL.ShapeSource
                id={shortid.generate()}
                cluster
                clusterRadius={50}
                clusterMaxZoom={14}
                shape={mockTrailCenterData}
            >
                <MapboxGL.SymbolLayer
                    id="pointCount2"
                    style={layerStyles.clusterCount}
                />
                <MapboxGL.CircleLayer
                    id="clusteredPoints2"
                    belowLayerID="pointCount2"
                    filter={["has", "point_count"]}
                    style={layerStyles.clusteredPoints}
                />

                <MapboxGL.CircleLayer
                    id="singlePoint2"
                    filter={["!has", "point_count"]}
                    style={layerStyles.singlePoint}
                />
            </MapboxGL.ShapeSource>
        );
    }
}

const layerStyles = MapboxGL.StyleSheet.create({
    singlePoint: {
        iconAllowOverlap: true,
        circleColor: "#05668D",
        circleOpacity: 1,
        circleStrokeWidth: 2,
        circleStrokeColor: "black",
        circleRadius: 12,
        circlePitchAlignment: MapboxGL.CirclePitchAlignment.Map
    },
    clusteredPoints: {
        iconAllowOverlap: true,
        circlePitchAlignment: MapboxGL.CirclePitchAlignment.Map,
        circleColor: MapboxGL.StyleSheet.source(
            [
                [2, "#028090"],
                [3, "#00A896"],
                [5, "#02C39A"],
                [7, "#70C1B3"],
                [10, "#B2DBBF"],
                [15, "#F3FFBD"]
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
        circleStrokeColor: "black"
    },
    clusterCount: {
        textField: "{point_count}",
        textSize: 25,
        textColor: "black",
        textPitchAlignment: MapboxGL.TextPitchAlignment.Map
    }
});

export default MockCenterPoints;
