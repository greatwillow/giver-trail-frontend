import BackgroundTimer from "react-native-background-timer";

//--------------------------------------------------
// REQUESTING GEOLOC PERMISSION
//--------------------------------------------------

export function requestGeolocationPermission() {
  async function permissionDecision() {
    if (Platform.OS !== "android" && Platform.Version >= 23) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "GiverTrail Requires Location Access Permission",
            message:
              "Givertrail needs to access your location " +
              "so you can record and see your adventures."
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return "authorized";
        } else {
          return "denied";
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }
  return permissionDecision().then(result => {
    //TODO: Place this into redux state
    // this.setState({
    //   locationPermission: result
    // });
  });
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

// //--------------------------------------------------
// // GEOLOCATION CONFIG
// //--------------------------------------------------
// export function configureGeolocation() {
//   BackgroundGeolocation.configure({
//     desiredAccuracy: 0,
//     stationaryRadius: 10,
//     distanceFilter: 3,
//     notificationTitle: "Background tracking",
//     notificationText: "enabled",
//     debug: false, //for sounds
//     startOnBoot: false,
//     stopOnTerminate: false,
//     locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
//     //interval: 500,
//     stopOnStillActivity: false
//   });
// }

// //--------------------------------------------------
// // AUTHORIZING STATUS
// //--------------------------------------------------

// export function onGeolocationAuthorize() {
//   console.log("====================================");
//   console.log("AUTHORIZING NOW ");
//   console.log("====================================");
//   BackgroundGeolocation.on("authorization", status => {
//     console.log("[INFO] BackgroundGeolocation authorization status: " + status);
//     if (status !== BackgroundGeolocation.AUTHORIZED) {
//       Alert.alert(
//         "Location services are disabled",
//         "Would you like to open location settings?",
//         [
//           {
//             text: "Yes",
//             onPress: () => BackgroundGeolocation.showLocationSettings()
//           },
//           {
//             text: "No",
//             onPress: () => console.log("No Pressed"),
//             style: "cancel"
//           }
//         ]
//       );
//     }
//   });
// }

// //--------------------------------------------------
// // CHECK IF APP IS IN BACKGROUND
// //--------------------------------------------------
// export function checkIfAppInBackground() {
//   BackgroundGeolocation.on("background", () => {
//     console.log("[INFO] App is in background");
//   });

//   BackgroundGeolocation.on("foreground", () => {
//     console.log("[INFO] App is in foreground");
//   });
// }

// //--------------------------------------------------
// // CHECKING PERMISSION STATUS
// //--------------------------------------------------

// export function checkGeolocationStatus() {
//   console.log("====================================");
//   console.log("CHECK STATUS ");
//   console.log("====================================");
//   BackgroundGeolocation.checkStatus(status => {
//     console.log(
//       "[INFO] BackgroundGeolocation service is running",
//       status.isRunning
//     );
//     console.log(
//       "[INFO] BackgroundGeolocation service has permissions",
//       status.hasPermissions
//     );
//     console.log(
//       "[INFO] BackgroundGeolocation auth status: " + status.authorization
//     );

//     if (!status.isRunning) {
//       BackgroundGeolocation.start();
//     }
//   });
// }

// // //--------------------------------------------------
// // // ACTION AT EACH GPS POINT TAKEN IN
// // //--------------------------------------------------

// // export function onGeolocationPing() {
// //   BackgroundGeolocation.on("location", location => {
// //     BackgroundGeolocation.startTask(taskKey => {
// //       this.props.addLocationPointToTrail({
// //         longitude: location.longitude,
// //         latitude: location.latitude
// //       });
// //       if (this.props.trail.coordinates.length > 1) {
// //         const lineString = makeLineString(this.props.trail.coordinates);

// //         this.setState({
// //           route: lineString
// //         });
// //       }
// //       BackgroundGeolocation.endTask(taskKey);
// //     });
// //   });
// // }

// //--------------------------------------------------
// // START AND STOP
// //--------------------------------------------------

// export function onGeolocationStart() {
//   BackgroundGeolocation.on("start", () => {
//     console.log("[INFO] BackgroundGeolocation service has been started");

//         // const intervalId = BackgroundTimer.setInterval(() => {
//         //   console.log('tic');
//         // }, 200);

//         //BackgroundTimer.clearInterval(intervalId);

//   });
// }

// export function onGeolocationStop() {
//   BackgroundGeolocation.on("stop", () => {
//     console.log("[INFO] BackgroundGeolocation service has been stopped");
//   });
// }

// //--------------------------------------------------
// // STATIONARY
// //--------------------------------------------------

// export function onGeolocationStationary() {
//   BackgroundGeolocation.on("stationary", stationaryLocation => {
//     // handle stationary locations here
//     Actions.sendLocation(stationaryLocation);
//   });
// }

// //--------------------------------------------------
// // ERROR
// //--------------------------------------------------

// export function onGeolocationError() {
//   BackgroundGeolocation.on("error", error => {
//     console.log("[ERROR] BackgroundGeolocation error:", error);
//   });
// }
