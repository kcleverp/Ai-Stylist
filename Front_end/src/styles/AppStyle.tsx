import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        backgroundColor:"#131313",
    },
    content:{
        flex:1,
    },
    text:{
        color:"#dcd4d4",
        fontSize:14,
        letterSpacing: 1.5,
        alignSelf:"center",
    },
    imgInputButton:{
        backgroundColor:"#eeebebcf",
        borderWidth:1,
        borderColor: '#434242ac',      
        borderTopColor: '#555',
        borderRadius:30,
        width:"30%",
        height:"35%",
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
    closetContentsContainer:{
        height: 380, 
        flexGrow: 0,    
        marginBottom: 20,
        marginTop: 20,
    },
    closeBtn:{
        width:45,
        height:45,
        paddingBottom:5,
        marginRight:10
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
        height:"35%",
        aspectRatio:3/4,
    },
    closetArea:{
        flex:1,
        padding:10,
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
    },
    
    tabBar: {
    flexDirection: "row",
    height: 100, 
    backgroundColor: "#1a1a1a",
    borderTopWidth: 1,
    borderTopColor: "#333",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 20, 
    },
    tabItem: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    centerButton: {
        width: 70,
        height: 70,
        borderRadius: 33,
        backgroundColor: "#e4e1e1", 
        marginTop: -55, 
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
     weatherContainer:{
        height:100,
        width:300,
        backgroundColor:"#22212176",
        alignItems:"center",
        borderRadius:30,
        borderWidth: 1,
        borderColor: 'rgba(159, 155, 155, 0.18)',
        gap:20,
        position:"absolute",
        padding:10,
        top:80,
    },
    weatherTextContainer:{
        flexDirection:"row",
    },
    weatherText:{
        color:"#dcd4d4",
        fontSize:18,
        letterSpacing: 1.5
    },
    weatherRefreshButton:{
        width:50,
        height:35,
        position:"absolute",
        right:5,
    },
    icon:{
        width:45,
        height:30,
        resizeMode: 'contain'
    },
}) 