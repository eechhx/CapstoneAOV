import React from "react";
import { Text, Picker, Dimensions, Modal, Button, TouchableHighlight} from "react-native";
import { View, InputGroup, Input } from "native-base";
import styles from "./searchStyle.js";


const locations = require('../../locations.json')

//import * as data from '../../locations.json';


export class SearchBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        pickerSelection: 'Default value!',
        pickerDisplayed: false,
        latitude: null,
        longitude: null
        }   
    }

    setPickerValue(newLocation) {
        this.setState({
            pickerSelection: newLocation.name,
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude
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
            <Text>Please select a location { this.state.pickerSelection }</Text>
            <Button onPress={() => this.togglePicker()} title={ "Select a value!" } />
            {/* <Picker
                selectedValue={this.state.pickerSelection}
                style={{
                    justifyContent: 'center', 
                    borderColor: 'red', 
                    height: 50, 
                    width: Dimensions.get('window').width,
                    position: 'absolute'}}
                onValueChange = {(itemValue, itemIndex) =>
                this.setState({pickerSelection: itemValue})}
                >

                 PARSING JSON NAMES 
                {
                    locations.map((item) =>{
                    return(
                    <Picker.Item  label = {item.name} value={item.name} key={item.name}/>
                   );
                 })
                }
            </Picker> */}

            <Modal visible = {this.state.pickerDisplayed} animationType = {"slide"} transparent = {true}>
                <View style = {{ margin: 20, padding: 20,
                    backgroundColor: '#efefef',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    alignItems: 'center',
                    position: 'absolute' }}>
                    <Text style = {{fontSize: 20, fontWeight: 'bold'}}> Select Location  </Text>
                    { locations.map((item) => {
                    return <TouchableHighlight key = {item.name}  onPress = { () => this.setPickerValue(item)} style={{ paddingTop: 4, paddingBottom: 4 }}>
                        <Text>{ item.name }</Text>
                        </TouchableHighlight>
                    })}

                    
                    <TouchableHighlight onPress={() => this.togglePicker()} style={{ paddingTop: 4, paddingBottom: 4 }}>
                    <Text style={{ color: '#999' }}> Cancel </Text>
                    </TouchableHighlight>
                </View>
            </Modal>
            

                {/* <View style = {styles.secondInputWrapper}>
                    <Text style = {styles.label}>DROP OFF</Text>
                    <InputGroup>
                        <Input style = {styles.inputSearch} placeholder = "Choose a dropoff location!"/>
                    </InputGroup>
                </View> */}


            </View>
        );
    }
};

//export default SearchBox;
module.exports = SearchBox;