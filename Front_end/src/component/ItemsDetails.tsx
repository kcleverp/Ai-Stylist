import Button from "./Button";
import {View, StyleSheet} from "react-native"
import AppText from "./AppText";
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
                            <AppText style={style.categoryText}>{category}</AppText>
                        </View>
                        <View style={style.nameContainer}>
                            <AppText variant="SemiBold" style={style.itemName}>{name}</AppText>
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
        backgroundColor:"#333232c1",
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
        color:"#dcd4d4",
        fontSize:13,
    },
    itemName:{
        color:"#eeee",
        fontSize:16,
    }
})