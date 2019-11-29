import React from "react";
import { Text, Picker, Dimensions, Modal, Button, TouchableHighlight} from "react-native";
import { View, InputGroup, Input } from "native-base";
import styles from "./searchStyle.js";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectDestination } from '../../redux/actions/index';


const locations = require('../../locations.json')

//import * as data from '../../locations.json';


class SearchBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        pickerSelection: 'No Location Selected',
        pickerDisplayed: false,
        latitude: null,
        longitude: null
        }   
    }

    setPickerValue(destination) {
        // this.setState({
        //     pickerSelection: newLocation.name,
        //     latitude: newLocation.coords.latitude,
        //     longitude: newLocation.coords.longitude
        // })

        //const destination = event.target.value;
		console.log(destination.title);
        console.log("hello" + destination.latitude);
		this.props.selectDestination(destination.title);

        this.setState({
            pickerSelection: destination.title
        })

        this.togglePicker();
    }

    togglePicker() {
        this.setState({
            pickerDisplayed: !this.state.pickerDisplayed
        })
    }

    render() {
        console.log(this.state.latitude, this.state.longitude);

        return (
        <View style = {styles.container}>
            <Text style = {styles.menuText}>Selected Location:</Text><Text style = {styles.selectedText}> { this.state.pickerSelection }</Text>

            <Button onPress={() => this.togglePicker()} title={ "Select a location!" } />

            <Modal visible = {this.state.pickerDisplayed} animationType = {"slide"} transparent = {true}>
                <View style = {{ margin: 20, padding: 20,
                    backgroundColor: '#efefef',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    alignItems: 'center',
                    position: 'absolute' }}>
                    <Text style = {{fontSize: 20, fontWeight: 'bold'}}> Select Location  </Text>

                    {/* { locations.map((item) => {
                    return <TouchableHighlight key = {item.name}  onPress = { () => this.setPickerValue(item)} style={{ paddingTop: 4, paddingBottom: 4 }}>
                        <Text>{ item.name }</Text>
                        </TouchableHighlight>
                    })} */}

                    { 
                    Object.keys(this.props.destination).map((key) => {
                    const destination = this.props.destination[key];
                    return  <TouchableHighlight key = {key} onPress = { () => this.setPickerValue(destination)} style={{ paddingTop: 4, paddingBottom: 4 }}>
                        <Text key={key} value={key}>
                            {destination.title}
                        </Text> 
                        </TouchableHighlight>
                    })}

                    
                    <TouchableHighlight onPress={() => this.togglePicker()} style={{ paddingTop: 4, paddingBottom: 4 }}>
                    <Text style={{ color: '#999' }}> Cancel </Text>
                    </TouchableHighlight>
                </View>
            </Modal>
            </View>
        );
    }


};

function mapStateToProps(state) {
	return {
		destination: state.destination
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ selectDestination: selectDestination }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);