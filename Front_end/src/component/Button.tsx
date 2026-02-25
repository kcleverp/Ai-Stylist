import { Pressable, StyleSheet, ViewStyle } from "react-native"
import AppText from "./AppText"
import { FontVariants } from "../types/schema"

type props = {
    label?:string
    onPress:() => void
    onLongPress?:() => void
    fontColor?:string
    variant?:FontVariants
    fontSize?:number
    children?: React.ReactNode
    styles?: ViewStyle | ViewStyle[]
    disabled?:boolean
}

export default function Button({onPress, onLongPress, label, fontSize, fontColor, disabled, variant, children, styles}:props){
    return(
        <Pressable
         style = {({pressed}) =>([
            style.button,
            styles,
            pressed && {opacity:0.7},
            disabled && {opacity:0.4}
        ])}
            onPress = {onPress}
            onLongPress={onLongPress}
            delayLongPress={500}
            disabled={disabled}>
            {label &&
                <AppText variant= {variant} style={{color:fontColor, fontSize:fontSize}}>{label}</AppText>}
            {children}
        </Pressable>
    )
}

const style = StyleSheet.create({
    button:{
        alignItems:"center",
        justifyContent:"center",
    },
})