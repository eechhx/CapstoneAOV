import { Dimensions } from "react-native";
var width = Dimensions.get("window").width; //full width
const styles = {
    searchBox:{
        top:70,
        position:"absolute",
        width:width
    },
    inputWrapper:{
        marginLeft:15,
        marginRight:15,
        marginTop:10,
        marginBottom:0,
        backgroundColor:"#fff",
        opacity:0.9,
        borderRadius:7
    },
    secondInputWrapper:{
        marginLeft:15,
        marginRight:10,
        marginTop:0,
        backgroundColor:"#fff",
        opacity:0.9,
        borderRadius:7
    },
    inputSearch:{
        fontSize:20
    },
    label:{
        fontSize:20,
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        marginBottom:0,
        backgroundColor:"white"
    },
    container: {
        top: -150,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
};

export default styles;