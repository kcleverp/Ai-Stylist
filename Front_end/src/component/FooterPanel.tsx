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
                <TextInput placeholder="#결혼식 하객룩" placeholderTextColor="rgb(200, 200, 200)" 
                style={style.input} value ={input} onChangeText={(text) => {getInput(text)}} {...({style: { ...style.input, outlineStyle:'none'}} as any)}/>
                <View style={style.contorlBtn}>
                    <Button fontColor="rgb(200, 200, 200)" fontSize={15} label="➤" onPress={() => sendInfo()} styles={{flex:1}}/>
                    <Button fontColor="rgb(200, 200, 200)" fontSize={15} label="⚙️" styles={{flex:1}} onPress={() => {isSettingOpen ? setIsSettingOpen(false):setIsSettingOpen(true)}}/>
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

    contorlBtn:{
        flexDirection:"row",
        width:"30%",
        height:"100%",
        justifyContent:"center",
        gap:"15%",
    },

    inputContainer:{
        backgroundColor:"rgb(31, 31, 31)",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        borderWidth:1,
        borderRadius:20,
        flex:1
    },

    input:{
        flex:1,
        height:"100%",
        color:"#fffcfcc5",
        outline:"none",
        margin:10,
    },
})

