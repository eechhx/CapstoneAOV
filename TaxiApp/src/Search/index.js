import React from "react";
import { Text, Picker, Dimensions} from "react-native";
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

  

    render() {

        return (
        <View style = {styles.searchBox}>
    
            <Picker
                selectedValue={this.state.pickerSelection}
                style={{
                    justifyContent: 'center', 
                    borderColor: 'red', 
                    height: 50, 
                    top: 0,
                    width: Dimensions.get('window').width,
                    position: 'absolute'}}
                onValueChange = {(itemValue, itemIndex) =>
                this.setState({pickerSelection: itemValue})}
                >

                {/* PARSING JSON NAMES */}
                {
                    locations.map((item) =>{
                    return(
                    <Picker.Item  label = {item.name} value={item.name} key={item.name}/>
                   );
                 })
                }
            </Picker>

            

            


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
module.exports = SearchBox