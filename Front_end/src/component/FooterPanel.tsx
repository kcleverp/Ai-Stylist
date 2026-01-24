import { useState } from "react"
import { StyleSheet, TextInput, View } from "react-native"
import { Setting } from "../types/schema"
import Button from "./Button"
import UserInfo from "./UserInfo"

type props = {
    sendInfo: () => void
    getInfo: (infoList:Setting) => void
    input: string
    getInput: (input:string) => void
    isWeatherLoading:boolean
}


export default function FooterPanel({sendInfo, getInfo, isWeatherLoading, getInput, input}:props){
    const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false)
    return (
        <View style={style.container}>
            <UserInfo isSettingOpen={isSettingOpen} setIsSettingOpen={setIsSettingOpen} getInfo={getInfo}/>
            <View style={style.inputContainer}>
                <TextInput placeholder="#결혼식 하객룩" placeholderTextColor="rgb(200, 200, 200)" maxLength={50}
                style={style.input} value ={input} onChangeText={(text) => {getInput(text)}} 
                returnKeyType="send" onSubmitEditing={sendInfo}
                {...({style: { ...style.input, outlineStyle:'none'}} as any)}/>
                <View style={style.contorlBtn}>
                    <Button fontColor="rgb(200, 200, 200)" fontSize={14} disabled={isWeatherLoading || !input} label="➤" onPress={() => sendInfo()} styles={style.button}/>
                    <Button variant="Bold" fontColor="rgb(200, 200, 200)" fontSize={14} label="내정보" styles={style.button} onPress={() => {isSettingOpen ? setIsSettingOpen(false):setIsSettingOpen(true)}}/>
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

