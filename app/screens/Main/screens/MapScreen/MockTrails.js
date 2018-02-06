import React, { Component } from "react";
import MapboxGL from "@mapbox/react-native-mapbox-gl";
import shortid from "shortid";
import commonColors from "../../../../constants/colors";
import mockTrailData from "../../../../assets/pureData/mockTrailData";

class MockTrails extends Component {
    render() {
        return mockTrailData.map(trail => {
            return (
                <MapboxGL.ShapeSource
                    id={shortid.generate()}
                    key={shortid.generate()}
                    shape={trail}
                >
                    <MapboxGL.LineLayer
                        id={shortid.generate()}
                        style={layerStyles.trailLine}
                    />
                </MapboxGL.ShapeSource>
            );
        });
    }
}

const layerStyles = MapboxGL.StyleSheet.create({
    trailLine: {
        lineColor: commonColors.PINK,
        lineWidth: 3,
        lineOpacity: 0.8
    }
});

export default MockTrails;
