import BackgroundTimer from "react-native-background-timer";

//--------------------------------------------------
// CALCULATE TRAIL LENGTH
//--------------------------------------------------

export function calculateTrailLength(trails) {
  //let incrementDistance;
  //let distanceArray;
  //let trailDistance;
  let totalDistance;

  // for(i=0; i<trails.length-1; i++) {
  //   incrementDistance = euclideanDistance(trails[i][0], trails[i][1], trails[i+1],[0], trails[i+1],[1])
  //   distanceArray = distanceArray.concat(incrementDistance)
  // }

  console.log('====================================');
  console.log("INPUT T IS ", trails);
  console.log("EUC is ", euclideanDistance(-122.02335996,37.32463487,-122.02339656,37.32463256));
  console.log('====================================');

  totalDistance = trails.map(trail => {
    trail.coordinates.map((coordinate, i, arr) => {
      if (i < arr.length - 1) {

        console.log('====================================');
        console.log("ARR 1 ",arr[i][0]);
        console.log("ARR 1 ",arr[i][1]);
        console.log("ARR 1 ",arr[i+1][0]);
        console.log("ARR 1 ",arr[i+1][1]);
        console.log('====================================');
          return (async function testFunction() {
            const val = await euclideanDistance(
              arr[i][0],
              arr[i][1],
              arr[i + 1],
              [0],
              arr[i + 1],
              [1]
            );
            console.log('====================================');
            console.log("VAL IS ",val);
            console.log('====================================');
            return val
          })();

        }
        return
    }).reduce((a, b) => {
      console.log('====================================');
      console.log("A is ",a);
      console.log("RED1 IS ",a+b);
      console.log('====================================');
      return a + b;
    })
  }).reduce((a, b) => {
    console.log('====================================');
    console.log("A2 is ",a);
    console.log("RED2 IS ",a+b);
    console.log('====================================');
    return a + b;
  });
  console.log('====================================');
  console.log("TOTAL IS ",totalDistance);
  console.log('====================================');
  return totalDistance;
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
