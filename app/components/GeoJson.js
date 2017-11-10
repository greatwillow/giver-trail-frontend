import React, { Component, PropTypes } from "react";
import { View } from "react-native";
import MapView from "react-native-maps";
import uuid from "uuid";

export const makeOverlays = features => {
  const points = features
    .filter(f => f.geometry && (f.type === "node" || f.type === "Multinode"))
    .map(feature =>
      makeCoordinates(feature).map(geometry => makeOverlay(geometry, feature))
    )
    .reduce(flatten, [])
    .map(overlay => ({ ...overlay, type: "point" }));

  const lines = features
    .filter(
      f =>
        f.geometry && (f.type === "way" || f.type === "Multiway")
    )
    .map(feature =>
      makeCoordinates(feature).map(geometry => {
        console.log("MAKING COORDINATES! ", geometry)
       return makeOverlay(geometry, feature)
      })
    )
    .reduce(flatten, [])
    .map(overlay => {
      console.log("OVERLAY IS ",overlay)
      return ({ ...overlay, type: "polyline" })
    }
    );

  const multipolygons = features
    .filter(f => f.geometry && f.type === "MultiPolygon")
    .map(feature =>
      makeCoordinates(feature).map(geometry => makeOverlay(geometry, feature))
    )
    .reduce(flatten, []);

  const polygons = features
    .filter(f => f.geometry && f.type === "Polygon")
    .map(feature => makeOverlay(makeCoordinates(feature), feature))
    .reduce(flatten, [])
    .concat(multipolygons)
    .map(overlay => ({ ...overlay, type: "polygon" }));

  const overlays = points.concat(lines).concat(polygons);

  console.log("FINAL OVERLAYS ",overlays);

  return overlays;
};

const flatten = (prev, curr) => prev.concat(curr);

const makeOverlay = (geometry, feature) => {
  let overlay = {
    feature,
    id: feature.id ? feature.id : uuid()
  };
  if (feature.type === "Polygon" || feature.type === "MultiPolygon") {
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

const makeCoordinates = feature => {
  const g = feature;
  if (g.type === "node") {
    return [makenode(g.geometry)];
  } else if (g.type === "Multinode") {
    return g.geometry.map(makenode);
  } else if (g.type === "way") {
    return [makeLine(g.geometry)];
  } else if (g.type === "Multiway") {
    return g.geometry.map(makeLine);
  } else if (g.type === "Polygon") {
    return g.geometry.map(makeLine);
  } else if (g.type === "MultiPolygon") {
    return g.geometry.map(p => p.map(makeLine));
  } else {
    return [];
  }
};

const Geojson = props => {
  const overlays = makeOverlays(props.geojson.features);
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
              geometry={overlay.geometry}
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
