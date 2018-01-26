import shortid from "shortid";

export function generateUserTrailsFeatureCollection(trails) {
    let trailFeatures = `{
        "type": "Feature",
        "key" : "${shortid.generate()}",
        "geometry": {
                "type": "Point",
                "coordinates": [0,0]
            },
            "properties": {
                "name": "No Name"
            }
    }`;
    let trailFeatureCollection = `{
        "type":"FeatureCollection",
            "features": [${trailFeatures}]
        }`;

    if (trails.length > 0) {
        trailFeatures = trails
            .map(trail => {
                let currentFeature = `{
                    "type": "Feature",
                    "key" : "${shortid.generate()}",
                    "geometry": {
                            "type": "Point",
                            "coordinates": [0,0]
                        },
                        "properties": {
                            "name": "${shortid.generate()}"
                        }
                }`;
                console.log("T CENTER ", trail.centerPoint);
                if (trail.centerPoint instanceof Array) {
                    currentFeature = `{
                    "type": "Feature",
                    "key" : "${shortid.generate()}",
                    "geometry": {
                            "type": "Point",
                            "coordinates": [${trail.centerPoint}]
                        },
                        "properties": {
                            "name": "${shortid.generate()}"
                        }
                    }`;
                    return currentFeature;
                }
                return currentFeature;
            })
            .reduce((combined, toCombine) => {
                return combined + "," + toCombine;
            });

        console.log("====FEATURES ", trailFeatures);

        trailFeatureCollection = `{
        "type":"FeatureCollection",
            "features":[${trailFeatures}]
        }`;

        console.log("====FEATURES Collection ", trailFeatureCollection);
    }

    return JSON.parse(trailFeatureCollection);
}
