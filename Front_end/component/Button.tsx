import { Pressable, StyleSheet, Text } from "react-native"

type props = {
    label:string
    onPress:() => void
    fontColor:string
}

export default function Button({onPress,label, fontColor}:props){
    return(
        <Pressable style={style.button} onPress = {onPress}>
            <Text style={{color:fontColor}}>{label}</Text>
        </Pressable>
    )
}

const style = StyleSheet.create({
    buttonContainer:{
        alignItems:"center",
        justifyContent:"center",
        
    },
    button:{
        alignItems:"center",
        justifyContent:"center",
        width:"100%",
        height:"100%",
       

    },
})