import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import AppText from "./AppText";

interface Item{
    label:string;
    value:string;
}

type props = {
    items:Item[]
    setValue:(result:string) => void
    value:string
}

export default function Picker({items, value, setValue}:props){
    return(
        <View style={style.container}>
            {items.map((item) => {
                return(
                    <View key = {item.value} style={style.buttonContainer}>
                        <Pressable
                        style={[style.button, (value === item.value) && style.selected ]} 
                        onPress={() => setValue(item.value)}>
                            <AppText style={style.label}>{item.label}</AppText>
                        </Pressable>
                    </View>
                    )
                }
                )
            }
        </View>
    )
}


const style= StyleSheet.create({
    container:{
        flexDirection:"row",
        width:"70%",
        height:70,
        alignItems:"center",
        justifyContent:"center"
    },
    buttonContainer:{
        alignItems:"center",
        justifyContent:"center",
        width:"35%",
        margin:5,
        height:50,
    },
    button:{
        alignItems:"center",
        justifyContent:"center",
        width:"100%",
        height:"100%",
        backgroundColor:"#333232c1",
        borderRadius:10,
    },
    selected:{
        backgroundColor:"#131313",
        borderRadius:10,
    },
    label:{
        color:"#dcd4d4"
    }
    
})
