import Button from "./Button";
import {View, Text, StyleSheet} from "react-native"

interface Recommendation {
    cap:string
    top:string
    bottom:string
    shoes:string
    acc:string
}

type Props = {
 data:Recommendation | null
}


export default function ItemsDetails({data}:Props){
    if(!data){
        return null
    }
    return(
        <>
            {Object.entries(data).map(([category, name]) => (
                name &&(
                <Button key={category} onPress={() => alert([category])}>
                    <View style={style.itemsContainer}>
                        <View style={style.category}>
                            <Text style={style.categoryText}>{category}</Text>
                        </View>
                        <View style={style.nameContainer}>
                            <Text style={style.itemName}>{name}</Text>
                        </View>
                    </View>
                </Button>)
            ))}
        </>
    )
} 

const style = StyleSheet.create({
    nameContainer:{
        flex:1,
        marginLeft:10,
    },
    itemsContainer:{
        flexDirection:"row",
        backgroundColor:"#373535ff",
        borderWidth:1,
        borderColor: '#434242ac',      
        borderTopColor: '#555',
        elevation:10,
        width:"100%",
        height:65,
        borderRadius:30,
        paddingVertical: 10,
        alignItems:"center",
        padding:15,
        gap:10,
    },
    category:{
        backgroundColor:"#6d6b6bb3",
        width:70,
        height:35,
        borderWidth:1,
        borderColor: '#656565ff',       // 전체적인 경계
        borderTopColor: '#817d7dff',
        alignItems:"center",
        justifyContent:"center",
        borderRadius:30,
        
    },
    categoryText:{
        color:"#dbd9d9ff",
        fontSize:13,
        fontWeight:"bold",

    },
    itemName:{
        color:"#fff",
        fontSize:16,
        fontWeight:"bold"
    }
})