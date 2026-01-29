import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#131313",

    },
    text:{
        color:"#dcd4d4",
        fontSize:16,
        letterSpacing: 1.5,
    },
    imgInputButton:{
        backgroundColor:"#eeebebcf",
        borderWidth:1,
        borderColor: '#434242ac',      
        borderTopColor: '#555',
        borderRadius:30,
        width:"30%",
        height:"40%",
        aspectRatio:3/4,
        padding:5,
    },
    imgView:{
        backgroundColor:"#131313",
        borderWidth:1,
        borderColor: '#434242ac',      
        borderTopColor: '#555',
        borderRadius:30,
        flex:1,
        resizeMode:"contain"
    },
    closetContents:{
        flexDirection:"row",
        flexWrap:"wrap",
        gap:5,
    },
    imgClose:{
        position:"absolute",
        right:5,
        top:5,
        justifyContent:"center",
        width:30,
        height:30,
        backgroundColor:"#2524249e",
        borderRadius:15,
    },
    imgChip:{
        width:"30%",
        aspectRatio:3/4,
        
    },
    closetArea:{
        flex:1,
        padding:10
    },
    closetSaveBtn:{
        backgroundColor:"#787777cf",
        borderWidth:1,
        borderColor: '#434242ac',      
        borderTopColor: '#555',
        borderRadius:30,
        width: 200,
        height: 40,
        alignSelf:"center"
    },
    textButton:{
        flex:1,
        borderRadius:10,
        backgroundColor:"#333232c1",
        borderWidth:1,
        borderColor: '#434242ac',      
        borderTopColor: '#555',
    },
    footer:{
        backgroundColor:"rgb(36, 36, 36)",
        borderWidth:1,
        borderColor:"rgb(0, 0, 0)",
        height:180,
        width:"100%",
        padding:20,
    },
    Button:{
        alignItems:"center",
    }

}) 