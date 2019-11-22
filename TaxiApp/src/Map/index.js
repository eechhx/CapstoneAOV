/**
 * Capstone AOV
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline, 
  PROVIDER_GOOGLE,
  withGoogleMap
} from "react-native-maps";

import Geolocation from '@react-native-community/geolocation';
import SearchBox from "../Search/index.js";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// store = { configureStore() }

// var box = require('./src/Search/index.js');

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

  // componentDidMount() {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       console.log(SearchBox.latitude);
  //       this.setState({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //         error: null
  //     });
  //   },

  //   error => this.setState({ error: error.message }),
  //     { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
  //   );

  //   this.watchID = Geolocation.watchPosition(
  //     position => {
  //       const {routeCoordinates} = this.state;
  //       const {latitude, longitude} = position.coords;
  //       const newCoordinate = {
  //         latitude,
  //         longitude
  //       }
  //       this.setState({
  //         latitude,
  //         longitude,
  //         routeCoordinates: routeCoordinates.concat([newCoordinate])
  //       });
  //     },
  //   );
  // }

  // componentWillUnmount() {
  //   Geolocation.clearWatch(this.watchID);
  // }

  mergeCoords = () => {
    const {
      latitude,
      longitude,
      desLatitude,
      desLongitude 
    } = this.state 

    const hasStartAndEnd = latitude != null && desLatitude != null

    if (hasStartAndEnd) {
      const concatStart = `${latitude},${longitude}`
      const concatEnd = `${deslatitude},${desLongitude}`
      this.getDirections(concatStart, concatEnd)
    }
  }

  async getDirections(startLoc, desLoc) {
    try {
      const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=${AIzaSyCeojUCswu3iZbACDedukhHBTJ7PDVU6Ak}&mode=${mode}`)
      const respJson = await resp.json();
      const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      const coords = points.map(point => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
      this.setState( {coords} )
      } 
      catch(error) {
        console.log('Error: ', error)
      }
  }



  getMapRegion = () => ({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
  });
  
  componentDidUpdate() {
    console.log("Lat: " +  this.props.destination.latitude + " Long: " + this.props.destination.longitude);

    // this.markerLocation()
    }

    markerLocation() {
		return (
			{latitude: this.props.destination.latitude, longitude: this.props.destination.longitude}
		);
	}
  
  render() {
    let marker;

    if (this.props.destination){    
        marker = <MapView.Marker coordinate = {{latitude: this.props.destination.latitude, longitude: this.props.destination.longitude}} pinColor = "blue"/>
    }
    return (
      <View style = {styles.container}>
        {/* <MapView
          style = {styles.map}
          provider = {PROVIDER_GOOGLE} 
          region = {this.getMapRegion()} 
          showsMyLocationButton = {true}>

          <Polyline coordinates = {this.state.routeCoordinates} strokeWidth={2} />
          
          <MapView.Marker coordinate = {this.getMapRegion()}
                          pinColor = "blue"/>
        </MapView> */}
        <MapView
          style = {styles.map}
          provider = {PROVIDER_GOOGLE}
            initialRegion={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >

          {marker} 

          <MapView.Marker coordinate = {this.getMapRegion()} />

          {/* <Polyline coordinates = {this.markerLocation()} strokeWidth = {2} /> */}
          </MapView>
          
        <SearchBox/>

      </View>
    )
  }
}

function mapStateToProps(state) {
	return {
		destination: state.activeDestination,
	};
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

// function mapDispatchToProps(dispatch) {
// 	return bindActionCreators({ selectDriver, setMyLocation, setDriversInfo }, dispatch);
// }

export default connect(mapStateToProps)(AnimatedMarkers);