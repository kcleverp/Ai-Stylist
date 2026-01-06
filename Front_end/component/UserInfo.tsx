import { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import Button from "./Button";
import NumInput from "./NumInput";
import Picker from "./Picker";
interface Info{
  userStyle:string
  gender:string
  height:number
  weight:number
}
type props = {
    getInfo: (infoList:Info) => void
    isSettingOpen:boolean
    setIsSettingOpen:(boolean:boolean) => void
}
export default function UserInfo({getInfo, isSettingOpen, setIsSettingOpen}:props){

    const [userStyle,setUserStyle] = useState<string>("")

    const items = [
        { label: '스트릿', value: '스트릿' },
        { label: '댄디', value: '댄디' },
        { label: '미니멀', value: '미니멀' },
        { label: "캐주얼", value: "캐주얼" },
    ]

    const genders = [
        { label: '남성', value: '남성' },
        { label: '여성', value: '여성' },
    ]

    const [gender,setGender] = useState<string>("")
    const [height,setHeight] = useState<number>(0)
    const [weight,setWeight] = useState<number>(0)

    const saveInfo = () => {
        const infoList = {
        "userStyle":userStyle, 
        "gender":gender,
        "height":height,
        "weight":weight
    }
    setIsSettingOpen(false)
    console.log(infoList)
    getInfo(infoList)
    }

    return (
        <Modal animationType="fade" transparent={true} visible={isSettingOpen} onRequestClose={() => setIsSettingOpen(false)}>
            <View style={style.overlay}>
                <View style={style.container}>
                    <View style={style.closeBtn}>
                        <Button fontColor = "#fff" onPress={() => {setIsSettingOpen(false)}} label="Close"/>
                    </View>
                    <Text style={style.text}>스타일</Text>
                    <Picker items={items} setValue={setUserStyle}/>
                    <Text style={style.text}>성별</Text>
                    <Picker items={genders} setValue={setGender}/>
                    <NumInput placeholder="" label="신장" value={String(height)} setValue={setHeight}/>
                    <NumInput placeholder="" label="체중" value={String(weight)} setValue={setWeight}/>
                    <View style={style.saveBtn}>
                        <Button fontColor = "#fff" onPress={saveInfo} label="저장"/>
                    </View>
                </View>
            </View>
        </Modal>
    )
}


const style = StyleSheet.create({
    overlay:{
        flex:1,
        backgroundColor:"#0b0b0bff",
        justifyContent:"center",
        alignItems:"center",
    },
    saveBtn:{
        position:"absolute",
        bottom:30,
        alignItems:"center",
        justifyContent:"center",
        width:50,
        height:50,
        borderRadius:20,
        borderWidth:1
    },
    container:{
        backgroundColor:"#484545ff",
        borderWidth:1,
        borderColor:"#000000ff",
        width:"90%",
        height:500,
        borderRadius:20,
        padding:60,
        alignItems:"center",
    },
    closeBtn:{
        position:"absolute",
        right:15,
        top:5,
        alignItems:"center",
        justifyContent:"center",
        width:50,
        height:50,
        
    },
    hide:{
        display:"none"
    },
    text:{
        color:"#f3f3f3c5",
    },
    input:{
        color:"#fff",
    },
    dropDown:{
        color:"#fff",
    },
    hidden:{
        display:"none"
    }
})