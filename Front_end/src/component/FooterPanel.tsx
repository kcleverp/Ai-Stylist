import { StyleSheet, TextInput, View } from "react-native"
import Button from "./Button"
import { Weather } from "../types/schema"

type props = {
    sendInfo: () => void
    input: string
    getInput: (input:string) => void
    userWeather:Weather,
    userId:string
}

export default function FooterPanel({sendInfo, getInput, input, userWeather, userId}:props){
    const isReady = input.trim().length > 0 && userWeather?.temp !== undefined && userId !== "";
    return (
        <View style={style.container}>
            <View style={style.inputContainer}>
                <TextInput placeholder="#결혼식 하객룩" placeholderTextColor="rgb(200, 200, 200)" maxLength={50}
                style={style.input} value ={input} onChangeText={(text) => {getInput(text)}} 
                returnKeyType="send" onSubmitEditing={() =>{
                    if(isReady){
                        sendInfo()
                    }else{
                        alert("유저 정보 대기중입니다")
                    }
                }}
                {...({style: { ...style.input, outlineStyle:'none'}} as any)}/>
                <View style={style.contorlBtn}>
                    <Button fontColor="rgb(200, 200, 200)" fontSize={14} disabled={!isReady} label="➤" onPress={() => sendInfo()} styles={style.button}/>
                </View>
            </View>
        </View>
    )
}



const style = StyleSheet.create({
    container:{
        alignItems:"center",
        width: "90%",
        height: 50,
    },
    button:{
        flex:1,
    },
    contorlBtn:{
        flexDirection:"row",
        height:50,
        width:100,
        justifyContent: "flex-end",
        gap:8,
    },

    inputContainer:{
        backgroundColor:"rgb(31, 31, 31)",
        flexDirection:"row",
        borderWidth:1,
        borderRadius:25,
        justifyContent:"center",
        flex:1,
        alignItems:"center",
        paddingHorizontal:15
    },

    input:{
        flex:1,
        color:"#fffcfcc5",
        fontSize:14,
        paddingTop:15,
        textAlignVertical: 'center',
        height:"100%",
        includeFontPadding: false,
        outline:"none",
    },
})

