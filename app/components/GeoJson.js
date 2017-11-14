import React, { Component, PropTypes } from "react";
import { View } from "react-native";
import MapView from "react-native-maps";
import uuid from "uuid";

export const makeOverlays = elements => {
  const points = elements
    .filter(e => e && (e.type === "node"))
    .map(element =>
      makeCoordinates(element).map(geometry => makeOverlay(geometry, element))
    )
    .reduce(flatten, [])
    .map(overlay => {
      console.log("POINTS OVERLAY: ", overlay)
      return ({ ...overlay, type: "point" })
    });

  const lines = elements
    .filter(
      e =>
        e.geometry && (e.type === "way")
    )
    .map(element =>
      makeCoordinates(element).map(geometry => {
       return makeOverlay(geometry, element)
      })
    )
    .reduce(flatten, [])
    .map(overlay => {
      return ({ ...overlay, type: "polyline" })
    }
    );

  const multipolygons = elements
    .filter(e => e.geometry && e.type === "MultiPolygon")
    .map(element =>
      makeCoordinates(element).map(geometry => makeOverlay(geometry, element))
    )
    .reduce(flatten, []);

  const polygons = elements
    .filter(e => e.geometry && e.type === "Polygon")
    .map(element => makeOverlay(makeCoordinates(element), element))
    .reduce(flatten, [])
    .concat(multipolygons)
    .map(overlay => ({ ...overlay, type: "polygon" }));

  const overlays = points.concat(lines).concat(polygons);
  return overlays;
};

const flatten = (prev, curr) => prev.concat(curr);

const makeOverlay = (geometry, element) => {
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



const makenode = c => ({ latitude: c.lat, longitude: c.lon });

const makeLine = l => l.map(makenode);

const makeCoordinates = element => { 
  const e = element;
  if (e.type === "node") {
    if(e.hasOwnProperty("geometry")) {
      return [makenode(e.geometry)];
    } 
    return []//return [makenode(e)];
  } else if (e.type === "way") {
    return [makeLine(e.geometry)];
  } else if (e.type === "Polygon") {
    return e.geometry.map(makeLine);
  } else {
    return [];
  }
};

const Geojson = props => {
  const overlays = makeOverlays(props.geojson.elements);
  return (
    <View>
      {overlays.map(overlay => {
        if (overlay.type === "point") {
          return (
            <MapView.Marker
              key={overlay.id}
              coordinate={overlay.geometry}
              pinColor={props.color}
            />
          );
        }
        if (overlay.type === "polygon") {
          return (
            <MapView.Polygon
              key={overlay.id}
              coordinates={overlay.geometry}
              holes={overlay.holes}
              strokeColor={props.strokeColor}
              fillColor={props.fillColor}
              strokeWidth={props.strokeWidth}
            />
          );
        }
        if (overlay.type === "polyline") {
          console.log("INSIDE MAPVIEW! ",overlay);
          return (
            <MapView.Polyline
              key={overlay.id}
              coordinates={overlay.geometry}
              strokeColor={props.strokeColor}
              strokeWidth={props.strokeWidth}
            />
          );
        }
      })}
    </View>
  );
};

export default Geojson;
