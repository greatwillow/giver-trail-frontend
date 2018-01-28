import shortid from "shortid";

export function generateTrailCenterPointFeatureCollection(trails) {
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
                // let currentFeature = `{
                //     "type": "Feature",
                //     "key" : "${shortid.generate()}",
                //     "geometry": {
                //             "type": "Point",
                //             "coordinates": [0,0]
                //         },
                //         "properties": {
                //             "name": "${shortid.generate()}"
                //         }
                // }`;
                console.log("T CENTER ", trail.centerPoint);
                if (trail.centerPoint instanceof Array) {
                    let currentFeature = `{
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
                console.log("COMBINED RESULT ", result);
                return result;
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
