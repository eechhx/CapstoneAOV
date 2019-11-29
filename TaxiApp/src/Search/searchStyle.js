import { Dimensions } from "react-native";
var width = Dimensions.get("window").width; //full width
const styles = {
    searchBox:{
        position:"absolute",
        width:width
    },
    container: {
        padding: 10,
        top: -100,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuText: {
        fontSize: 19
    },
    selectedText: {
        fontSize: 19,
        fontWeight: 'bold'
    }
};

export default styles;