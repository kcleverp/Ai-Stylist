import { StyleSheet, TextInput, View } from "react-native"
import AppText from "./AppText"


type props = {
    label:string
    placeholder:string
    value:string
    setValue: (result:number) => void
}


export default function NumInput({label,placeholder, value, setValue}:props) {
    return(
        <View style={style.container}>
            <AppText style={style.label}>{label}</AppText>
            <View style={style.inputContainer}>
                <TextInput 
                style = {style.input}
                placeholder={placeholder} 
                value={value} 
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
        width:"90%",
        height:85,
        alignItems:"center",
        justifyContent:"center",
    },
    label:{
        color:"#f3f3f3c5"
    },
    inputContainer:{
        height:40,
        width:100,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#333232c1",
        borderRadius:10,
        margin:15,
    },
    input:{
        fontSize:15,
        color:"rgb(255, 241, 241)",
        
        outline:"none",
        
    }
})