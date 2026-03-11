import { StyleSheet, TextInput, View } from "react-native"
import Button from "./Button"
import { Weather } from "../types/schema"
import { useNavigateTo } from "../services/useNavigateTo"

type props = {
    sendInfo: () => void
    input: string
    getInput: (input:string) => void
    userWeather:Weather,
    userId:string
}

export default function FooterPanel({sendInfo, getInput, input, userWeather, userId}:props){
    const isReady = input.trim().length > 0 && userWeather?.temp !== undefined && userId !== "";
    const {navigateTo} = useNavigateTo()
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
                    <Button fontColor="rgb(200, 200, 200)" fontSize={14} disabled={!isReady} label="➤" onPress={() => sendInfo()} styles={style.sendBtn}/>
                </View>
            </View>
            <Button label="📂옷장 목록" fontColor="#dcd4d4" styles={style.libraryBtn} onPress={() => navigateTo("/ClosetLibrary")}/>
        </View>
    )
}



const style = StyleSheet.create({
    container:{
        width: "90%",
        height: 100,
        backgroundColor:"rgb(31, 31, 31)",
        borderRadius:25,
        padding:5
    },
    sendBtn:{
        width:45,
        height:45,
    },
    libraryBtn:{
        width:80,
        height:45,
        marginLeft:20
    },
    contorlBtn:{
        flexDirection:"row",
        height:50,
        width:100,
        justifyContent: "flex-end",
        gap:8,
    },

    inputContainer:{
        flexDirection:"row",
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
        textAlignVertical: 'center',
        height:"100%",
        includeFontPadding: false,
        outline:"none",
    },
})

