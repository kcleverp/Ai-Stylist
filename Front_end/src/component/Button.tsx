import { Pressable, StyleSheet, ViewStyle } from "react-native"
import AppText from "./AppText"
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
                <AppText style={{color:fontColor, fontSize:fontSize}}>{label}</AppText>}
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