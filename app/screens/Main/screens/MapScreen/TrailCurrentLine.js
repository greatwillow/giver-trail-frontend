import React, { Component } from "react";
import MapboxGL from "@mapbox/react-native-mapbox-gl";
import shortid from "shortid";
import { lineString as makeLineString } from "@turf/helpers";

import commonColors from "../../../../constants/colors";

class TrailCurrentLine extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    let shouldUpdate;
    this.props.trail.coordinates.length !== nextProps.trail.coordinates.length
      ? (shouldUpdate = true)
      : (shouldUpdate = false);
    if (this.props.mapUI.trackingStatus !== nextProps.mapUI.trackingStatus) {
      if (nextProps.mapUI.trackingStatus === false) {
        shouldUpdate = false;
        this.props.addTrailToTrails(this.props.trail);
        this.props.setTrailCenterPoint(this.props.trail);
        this.props.generateNewTrail();
      } else {
        shouldUpdate = true;
      }
    }

    return shouldUpdate;
  }

  render() {
    let lineString = {};
    if (this.props.trail.coordinates.length >= 2) {
      lineString = makeLineString(this.props.trail.coordinates);
    }
    return (
      <MapboxGL.Animated.ShapeSource id={shortid.generate()} shape={lineString}>
        <MapboxGL.Animated.LineLayer
          id={shortid.generate()}
          style={layerStyles.currentTrailLine}
        />
      </MapboxGL.Animated.ShapeSource>
    );
  }
}

const layerStyles = MapboxGL.StyleSheet.create({
  currentTrailLine: {
    lineColor: commonColors.PINK,
    lineWidth: 5,
    lineOpacity: 0.84
  }
});

export default TrailCurrentLine;
