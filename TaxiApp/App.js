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

import Geolocation from '@react-native-community/geolocation';
import SearchBox from "./src/Search/index.js";

//import haversine from "haversine";

const LATITUDE = 43.260909;
const LONGITUDE = -79.919218;
const LATITUDE_DELTA = 0.09;
const LONGITUDE_DELTA = 0.09;


class AnimatedMarkers extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      error: null,
      routeCoordinates: [],
      distanceTravelled: 0
    };
  }

  componentDidMount() {
    fetch('./locations.json');

    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
      });
    },

    error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
    );

    this.watchID = Geolocation.watchPosition(
      position => {
        const {routeCoordinates} = this.state;
        const {latitude, longitude} = position.coords;
        const newCoordinate = {
          latitude,
          longitude
        }
        this.setState({
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate])
        });
      },
    );
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

    
  getMapRegion = () => ({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
  });

  render() {
    return (
      <View style = {styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE} 
          region = {this.getMapRegion()} 
          showsMyLocationButton = {true}>

          <Polyline coordinates = {this.state.routeCoordinates} strokeWidth={2} />
          
          <MapView.Marker coordinate = {this.getMapRegion()}
                          pinColor = "blue"/>
        </MapView>
        <SearchBox/>

      </View>
    )
  }
}

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


export default AnimatedMarkers;