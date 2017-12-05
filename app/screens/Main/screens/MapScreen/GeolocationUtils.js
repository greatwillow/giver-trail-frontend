import BackgroundTimer from "react-native-background-timer";

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
