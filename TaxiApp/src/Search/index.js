import React from "react";
import { Text } from "react-native";
import { View, InputGroup, Input } from "native-base";
import styles from "./searchStyle.js";

export const SearchBox = () => {
    return (
        <View style = {styles.searchBox}>
            <Text style = {styles.label}>PICK UP</Text>
            <InputGroup>
                {/* <Icon name = "search" size = {15} color = "orange"/> */}
                <Input style = {styles.inputSearch} placeholder = "Choose a pickup location!"/>
            </InputGroup>
        </View>
    );
};

export default SearchBox;