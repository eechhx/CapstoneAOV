/**
 * Capstone AOV
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { configureStore } from './redux/store.js';
import { Provider, connect } from 'react-redux';
import AnimatedMarkers from './src/Map/index';


export default class App extends React.Component {
  
  render() {
    return (
      <Provider store = {configureStore()}>
      <AnimatedMarkers/>
      </Provider>
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

