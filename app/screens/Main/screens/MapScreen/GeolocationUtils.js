import BackgroundTimer from "react-native-background-timer";

//--------------------------------------------------
// CALCULATE TRAIL LENGTH
//--------------------------------------------------

function calculateIndividualTrailLength(trail) {
  const trailIncrementDistances = new Promise(resolve => {
    let trailIncrement = trail.coordinates.map((coordinate, i, arr) => {
      if (i < arr.length - 1) {
        const distance = euclideanDistance(
          arr[i][0],
          arr[i][1],
          arr[i + 1][0],
          arr[i + 1][1]
        );
        return distance;
      }
      return;
    });
    resolve(trailIncrement);
  });

  function individualTrailLength() {
    return Promise.all(trailIncrementDistances)
      .then(results => {
        return results.reduce((a, b) => {
          if (a !== undefined && b !== undefined) {
            const c = Number(a) + Number(b);
            return c;
          }
        }, 0);
      })
      .catch(err => console.error("INDIV TRAIL LENGTH PROMISE ERROR: ", err));
  }

  return individualTrailLength();
}

export function calculateTrailLength(trails) {
  let totalDistance = [];

  if (trails.trails.length > 0) {
    totalDistance = Promise.all(
      trails.trails.map(trail => {
        return calculateIndividualTrailLength(trail);
      })
    ).catch(err =>
      console.error("CALCULATE TRAIL LENGTH PROMISE ERROR: ", err)
    );

    const finalDistance = totalDistance.then(results => {
      return Promise.all(results)
        .then(innerResults => {
          return innerResults.reduce((a, b) => {
            if (a !== undefined && b !== undefined) {
              return Number(a) + Number(b);
            }
            return;
          });
        })
        .catch(err => console.error("FINAL DISTANCE PROMISE ERROR: ", err));
    });
    return finalDistance;
  }
}

//--------------------------------------------------
// REQUESTING GEOLOC PERMISSION
//--------------------------------------------------

export function requestGeolocationPermission() {
  // async function permissionDecision() {
  //   if (Platform.OS !== "android" && Platform.Version >= 23) {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //         {
  //           title: "GiverTrail Requires Location Access Permission",
  //           message:
  //             "Givertrail needs to access your location " +
  //             "so you can record and see your adventures."
  //         }
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         return "authorized";
  //       } else {
  //         return "denied";
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   }
  // }
  // return permissionDecision().then(result => {
  //   //TODO: Place this into redux state
  //   // this.setState({
  //   //   locationPermission: result
  //   // });
  // });
}

//--------------------------------------------------
// GETTING DISTANCE FROM LAT LONG
//--------------------------------------------------

export function euclideanDistance(lon1, lat1, lon2, lat2) {
  function deg2rad(degrees) {
    radians = degrees * (Math.PI / 180);
    return radians;
  }

  function Haversine(lon1, lat1, lon2, lat2) {
    deltaLat = lat2 - lat1;
    deltaLon = lon2 - lon1;
    earthRadius = 6369087; // in meters 3959 in miles.
    alpha = deltaLat / 2;
    beta = deltaLon / 2;
    a =
      Math.sin(deg2rad(alpha)) * Math.sin(deg2rad(alpha)) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(deg2rad(beta)) *
        Math.sin(deg2rad(beta));
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    distance = earthRadius * c;
    return distance.toFixed(2);
  }

  return Haversine(lon1, lat1, lon2, lat2);
}
