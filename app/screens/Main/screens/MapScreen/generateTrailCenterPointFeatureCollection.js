import shortid from "shortid";
import { featureCollection } from "@turf/helpers";

export function generateTrailCenterPointFeatureCollection(trails) {
    let trailFeatures = ``;

    let trailFeatureCollection = `{
                "type":"FeatureCollection",
                    "features": [${trailFeatures}]
                }`;

    if (trails.length > 0) {
        trailFeatures = trails
            .map(trail => {
                let currentFeature = `{
                    "type": "Feature",
                    "key" : "${trail.id}",
                    "geometry": {
                            "type": "Point",
                            "coordinates": [10,10]
                        },
                        "properties": {
                            "name": "${trail.id}"
                        }
                    }`;
                if (trail.centerPoint instanceof Array) {
                    currentFeature = `{
                            "type": "Feature",
                            "key" : "${trail.id}",
                            "geometry": {
                                    "type": "Point",
                                    "coordinates": [${trail.centerPoint}]
                                },
                                "properties": {
                                    "name": "${trail.id}"
                                }
                            }`;
                    return currentFeature;
                }
                return;
            })
            .reduce((combined, toCombine) => {
                let result = combined + "," + toCombine;
                return result;
            });

        trailFeatureCollection = `{
                    "type":"FeatureCollection",
                    "features":[${trailFeatures}]
                }`;

        console.log("FEATURES COL ", trailFeatureCollection);
    }

    const parsedFeatureCollection = JSON.parse(trailFeatureCollection);

    return parsedFeatureCollection;
}
