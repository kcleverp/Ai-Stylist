import { StyleSheet, Text, TextInput, View } from "react-native"



type props = {
    label:string
    placeholder:string
    value:string
    setValue: (result:number) => void
}


export default function NumInput({label,placeholder, value, setValue}:props) {
    return(
        <View style={style.container}>
            <Text style={style.label}>{label}</Text>
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
    )
}

const style = StyleSheet.create({
    container:{
        width:"90%",
        height:"10%",
        alignItems:"center",
        justifyContent:"center",
        margin:20,
    },
    label:{
        color:"#f3f3f3c5"
    },
    input:{
        width:"50%",
        height:"100%",
        backgroundColor:"#333232c1",
        borderRadius:10,
        fontSize:15,
        color:"#fcfcfcff",
        outline:"none",
        margin:10
    }
})