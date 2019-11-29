/**
 * Capstone AOV
 */

import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Button,
  TouchableOpacity
} from 'react-native';
import MapView, {
  Marker,
  AnimatedRegion,
  PROVIDER_GOOGLE,
  withGoogleMap,
  DirectionsRenderer,
} from "react-native-maps";

import Polyline from '@mapbox/polyline'

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
      coords: []
      //distanceTravelled: 0
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        console.log(SearchBox.latitude);
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

  //  watchID =  Geolocation.getCurrentPosition (
  //     ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, this.mergeCoords),
  //     (error) => console.log('Error:', error)
  //   )
    

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

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
      const concatEnd = `${this.props.destination.latitude},${this.props.destination.longitude}`
      this.getDirections(concatStart, concatEnd)
      console.log("INSIDE MERGE" + concatEnd)
    }
  console.log("flag here")
    
  }

  async getDirections(startLoc, desLoc) {
    try {
      let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=AIzaSyCeojUCswu3iZbACDedukhHBTJ7PDVU6Ak&mode=bicycling`)
      let respJson = await resp.json();
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point,index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
      console.log("JKFL:SAFJKLA:SFJKLA:")
      this.setState( {coords} )
      return coords
      } 
      catch(error) {
        console.log('Errorrrr: ', error)
      }
  }



  getMapRegion = () => ({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
  });
  
  componentDidUpdate() {
    // console.log("Lat: " +  this.props.destination.latitude + " Long: " + this.props.destination.longitude);
    // this.markerLocation()

    // const DirectionsService = new google.maps.DirectionsService();

		// DirectionsService.route(
		// 	{
		// 		origin: { lat: this.state.latitude, lng: this.state.longitude },
		// 		destination: { lat: this.props.destination.latitude, lng: this.props.destination.longitude },
		// 		travelMode: google.maps.TravelMode.DRIVING
		// 	},
		// 	(result, status) => {
		// 		if (status === google.maps.DirectionsStatus.OK) {
		// 			this.setState({
		// 				directions: result
		// 			});
    //       console.log("RESULTS HERE:" + result)

		// 		} else {
		// 			console.error(`error fetching directions ${result}`);
		// 		}
		// 	}
		// );

  }

  markerLocation() {
		return (
			{latitude: this.props.destination.latitude, longitude: this.props.destination.longitude}
		);
	}

  onButtonPress = () => {
    //const { coords : { latitude, longitude } } = destination
    //console.log("INSIDE ON MARKER PRESS!:J") 
    this.setState({
      //destination: location,
      desLatitude: this.props.destination.latitude,
      desLongitude: this.props.destination.longitude
    }, this.mergeCoords)

    //console.log("DESLATITUDE:" + this.state.desLatitude )
    //console.log("THIS.PROPS.DESTINATION.LAT: " + this.props.destination.latitude)
  };
  
  render() {
  
    let marker;
    var buttonShow = true;

    //console.log("HELLO" + coords);

    if (this.props.destination){    
        marker = <MapView.Marker coordinate = {{latitude: this.props.destination.latitude, longitude: this.props.destination.longitude}} pinColor = "blue" />
        //this.onMarkerPress(this.props.destination)
        buttonShow = false;
        console.log("HELLJKL:")
    }
    return (
      <React.Fragment>
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
          showsUserLocation
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

        <MapView.Polyline 
          strokeWidth = {2}
          strokeColor = 'red'
          coordinates = {this.state.coords}
        />

        </MapView>
        
        <SearchBox/>

        <View style = {styles.button}>
          <TouchableOpacity disabled = {true}>
            <Button 
              style = {styles.button}  
              onPress = {this.onButtonPress}
              title = 'Confirm Location'
              color = 'blue'
            />
          </TouchableOpacity>
        </View>
      </View>
    </React.Fragment>
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
  button: {
    backgroundColor: 'yellow',
    position: "relative"
  },
 });

// function mapDispatchToProps(dispatch) {
// 	return bindActionCreators({ selectDriver, setMyLocation, setDriversInfo }, dispatch);
// }

export default connect(mapStateToProps)(AnimatedMarkers);