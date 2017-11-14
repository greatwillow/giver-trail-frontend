import React, { Component, PropTypes } from "react";
import { View } from "react-native";

import Expo from "expo";

import uuid from "uuid";

class GeoJsonClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputtedElements: this.props.geojson.elements
    };
  }

  componentWillReceiveProps = nextProps => {
    this.setState({
      inputtedElements: nextProps.geojson.elements
    });
    console.log("NEXT PROPS ARE: ", nextProps);
    console.log("RECENT CHANGED ELEMENTS ARE: ", this.state.inputtedElements);
  };

  makeOverlays = elements => {
    const points = elements
      .filter(e => e && e.type === "node")
      .map(element =>
        this.makeCoordinates(element).map(geometry =>
          this.makeOverlay(geometry, element)
        )
      )
      .reduce(this.flatten, [])
      .map(overlay => {
        console.log("POINTS OVERLAY: ", overlay);
        return { ...overlay, type: "point" };
      });

    const lines = elements
      .filter(e => e.geometry && e.type === "way")
      .map(element =>
        this.makeCoordinates(element).map(geometry => {
          return this.makeOverlay(geometry, element);
        })
      )
      .reduce(this.flatten, [])
      .map(overlay => {
        return { ...overlay, type: "polyline" };
      });

    const multipolygons = elements
      .filter(e => e.geometry && e.type === "MultiPolygon")
      .map(element =>
        this.makeCoordinates(element).map(geometry =>
          this.makeOverlay(geometry, element)
        )
      )
      .reduce(this.flatten, []);

    const polygons = elements
      .filter(e => e.geometry && e.type === "Polygon")
      .map(element => this.makeOverlay(this.makeCoordinates(element), element))
      .reduce(this.flatten, [])
      .concat(multipolygons)
      .map(overlay => ({ ...overlay, type: "polygon" }));

    const overlays = points.concat(lines).concat(polygons);
    return overlays;
  };

  flatten = (prev, curr) => prev.concat(curr);

  makeOverlay = (geometry, element) => {
    let overlay = {
      element,
      id: element.id ? element.id : uuid()
    };
    if (element.type === "Polygon") {
      overlay.geometry = geometry[0];
      if (geometry.length > 1) {
        overlay.holes = geometry.slice(1);
      }
    } else {
      overlay.geometry = geometry;
    }
    return overlay;
  };

  makenode = c => ({ latitude: c.lat, longitude: c.lon });

  makeLine = l => l.map(this.makenode);

  makeCoordinates = element => {
    const e = element;
    if (e.type === "node") {
      if (e.hasOwnProperty("geometry")) {
        return [this.makenode(e.geometry)];
      }
      return []; //return [makenode(e)];
    } else if (e.type === "way") {
      return [this.makeLine(e.geometry)];
    } else if (e.type === "Polygon") {
      return e.geometry.map(this.makeLine);
    } else {
      return [];
    }
  };

  render() {
    const overlays = this.makeOverlays(this.state.inputtedElements);
    console.log("INPUTTED ELEMENTS ARE! ", this.state.inputtedElements);
    console.log("Overlays ARE! ", overlays);

    return (
      <View>
        {overlays.map(overlay => {
          if (overlay.type === "point") {
            return (
              <Expo.MapView.Marker
                key={overlay.id}
                coordinate={overlay.geometry}
                pinColor={this.props.color}
              />
            );
          }
          if (overlay.type === "polygon") {
            return (
              <Expo.MapView.Polygon
                key={overlay.id}
                coordinates={overlay.geometry}
                holes={overlay.holes}
                strokeColor={this.props.strokeColor}
                fillColor={this.props.fillColor}
                strokeWidth={this.props.strokeWidth}
              />
            );
          }
          if (overlay.type === "polyline") {
            console.log("INSIDE MAPVIEW! ", overlay);
            return (
              <Expo.MapView.Polyline
                key={overlay.id}
                coordinates={overlay.geometry}
                strokeColor={this.props.strokeColor}
                strokeWidth={this.props.strokeWidth}
              />
            );
          }
        })}
      </View>
    );
  }
}

export default GeoJsonClass;
