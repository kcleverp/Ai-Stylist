import { useState } from "react"
import { StyleSheet, TextInput, View } from "react-native"
import Button from "./Button"
import UserInfo from "./UserInfo"
interface Info{
  userStyle:string
  gender:string
  height:number
  weight:number
}
type props = {
    sendInfo: () => void
    getInfo: (infoList:Info) => void
    input: string
    getInput: (input:string) => void
}


export default function FooterPanel({sendInfo,getInfo, getInput, input}:props){
    
    const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false)
    return (
        <View style={style.container}>
            <UserInfo isSettingOpen={isSettingOpen} setIsSettingOpen={setIsSettingOpen} getInfo={getInfo}/>
            <View style={style.inputContainer}>
                <TextInput placeholder="#결혼식 하객룩" placeholderTextColor="#ffffffff" 
                style={style.input} value ={input} onChangeText={(text) => {getInput(text)}} {...({style: { ...style.input, outlineStyle:'none'}} as any)}/>
                <View style={style.sendBtn}>
                    <Button fontColor="#fff" label="➤" onPress={() => sendInfo()}/>
                </View>
                <View style= {style.settingBtn}>
                    <Button fontColor="#fff" label="⚙️" onPress={() => {isSettingOpen ? setIsSettingOpen(false):setIsSettingOpen(true)}}/>
                </View>
            </View>
        </View>
    )
}



const style = StyleSheet.create({
    container:{
        alignItems:"center",
        width: "80%",
        height: "6%",
    },

    settingBtn:{
        width:45,
        height:45,
    },

    sendBtn:{
        width:45,
        height:45,
    },

    inputContainer:{
        backgroundColor:"#484545ff",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        borderWidth:1,
        borderRadius:20,
        width:"100%",
        height:"100%",
    },

    input:{
        flex:1,
        height:"100%",
        color:"#ffffffc5",
        outline:"none",
        margin:10,
    },
})

