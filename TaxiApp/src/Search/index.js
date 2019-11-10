import React from "react";
import { Text } from "react-native";
import { View, InputGroup, Input } from "native-base";
import styles from "./searchStyle.js";
import DropdownMenu from 'react-native-dropdown-menu';

const locations = require('../../locations.json')

//import * as data from '../../locations.json';


export class SearchBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            name: null,
        };
    }
    
    render() {

        var names = []; 

       for (var i = 0; i < locations.length; i++)
        {
            var obj = locations[i];
            names.push(obj.name);
        }

        console.log(handler);

        var data = [names];
        return (
            <View style = {styles.searchBox}>
                <View style={{height: 64}} />
                
                <DropdownMenu
                style={{flex: 1}}
                bgColor={'white'}
                tintColor={'#666666'}
                activityTintColor={'green'}

                handler = {(selection) => this.setState({text: data[selection]})}
                data = {data}
                >

                </DropdownMenu>

                

                {/* <View style = {styles.inputWrapper}>
                    <Text style = {styles.label}>PICK UP</Text>
                    <InputGroup>
                        <Input style = {styles.inputSearch} placeholder = "Choose a pickup location!"/>
                    </InputGroup>
                </View> */}

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

export default SearchBox;