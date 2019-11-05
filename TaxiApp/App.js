/**
 * Capstone AOV
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline, 
  PROVIDER_GOOGLE
} from "react-native-maps";

import haversine from "haversine";

const LATITUDE = 43.260909;
const LONGITUDE = -79.919218;
const LATITUDE_DELTA = 0.09;
const LONGITUDE_DELTA = 0.09;

const App: () => React$Node = () => {
  return (
    <View style={styles.container}>
    <MapView
       provider={PROVIDER_GOOGLE}
       style={{ ...StyleSheet.absoluteFillObject }}
     />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });


 export default () => (
  <View style={styles.container}>
    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      //style={styles.map}
      style={{ ...StyleSheet.absoluteFillObject }}
    >
    </MapView>
  </View>
);