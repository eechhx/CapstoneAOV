import React from "react";
import { Text } from "react-native";
import { View, InputGroup, Input } from "native-base";
import styles from "./searchStyle.js";

export const SearchBox = () => {
    return (
        <View style = {styles.searchBox}>
            <View style = {styles.inputWrapper}>
                <Text style = {styles.label}>PICK UP</Text>
                <InputGroup>
                    <Input style = {styles.inputSearch} placeholder = "Choose a pickup location!"/>
                </InputGroup>
            </View>

            <View style = {styles.secondInputWrapper}>
                <Text style = {styles.label}>DROP OFF</Text>
                <InputGroup>
                    <Input style = {styles.inputSearch} placeholder = "Choose a dropoff location!"/>
                </InputGroup>
            </View>
        </View>
    );
};

export default SearchBox;