import { StyleSheet, TextInput, View } from "react-native"
import AppText from "./AppText"


type props = {
    label:string
    placeholder:string
    value:number
    setValue: (result:number) => void
}


export default function NumInput({label,placeholder, value, setValue}:props) {
    return(
        <View style={style.container}>
            <AppText style={style.label}>{label}</AppText>
            <View style={style.inputContainer}>
                <TextInput 
                keyboardType="numeric"
                style = {style.input}
                placeholder={placeholder}
                placeholderTextColor="#dcd4d4" 
                value = {value === 0 ?  "" : String(value) }
                onChangeText={(text) => {if(isNaN(Number(text))){
                    alert("숫자만 입력해주세요")
                }else{
                    {setValue(Number(text))}
                }}}/>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        width:"100%",
        height:85,
        alignItems:"center",
        justifyContent:"center",
        
    },
    label:{
        color:"#f3f3f3c5"
    },
    inputContainer:{
        height:40,
        width:"60%",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#333232c1",
        borderRadius:15,
        margin:15,
    },
    input:{
        fontSize:14,
        color:"#dcd4d4",
        width:"100%",
        textAlign: "center",
        outline:"none",
        
    }
})