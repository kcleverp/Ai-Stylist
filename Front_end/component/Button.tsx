import { Pressable, StyleSheet, Text, ViewStyle } from "react-native"

type props = {
    label?:string
    onPress:() => void
    fontColor?:string
    fontSize?:number
    children?: React.ReactNode
    styles?: ViewStyle | ViewStyle[]
}

export default function Button({onPress,label,fontSize, fontColor, children, styles}:props){
    return(
        <Pressable
         style = {({pressed}) =>([
            style.button,
            styles,
            pressed && {opacity:0.7}
        ])}
            onPress = {onPress}>
            {label &&
                <Text style={{color:fontColor, fontSize:fontSize}}>{label}</Text>}
            {children}
        </Pressable>
    )
}

const style = StyleSheet.create({
    button:{
        alignItems:"center",
        justifyContent:"center",
        padding:5,
    },
})