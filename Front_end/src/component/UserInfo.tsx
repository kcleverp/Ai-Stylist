import { useState } from "react";
import { Modal, StyleSheet, View, ScrollView } from "react-native";
import Button from "./Button";
import NumInput from "./NumInput";
import Picker from "./Picker";
import AppText from "./AppText";



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
        if(!height || !weight){
            alert("신장과 체중을 모두 입력해주세요")
            return null
        }

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
                <View style={style.cardContainer} >
                    <ScrollView style={style.container} contentContainerStyle={style.scrollContents}>
                        <View style={style.closeBtn}>
                            <Button fontColor = "#fff" fontSize={15} styles={{flex:1}} onPress={() => setIsSettingOpen(false)} label="X"/>
                        </View>
                        <View style={style.items}>
                            <AppText style={style.text}>스타일</AppText>
                            <Picker items={items} setValue={setUserStyle}/>
                            <AppText style={style.text}>성별</AppText>
                            <Picker items={genders} setValue={setGender}/>
                            <NumInput placeholder="입력해주세요" label="신장" value={height} setValue={setHeight}/>
                            <NumInput placeholder="입력해주세요" label="체중" value={weight} setValue={setWeight}/>
                            <View style={style.saveBtn}>
                                <Button variant="SemiBold" fontColor = "#dcd4d4" fontSize={15} styles={{flex:1}} onPress={saveInfo} label="저장"/>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}


const style = StyleSheet.create({
    overlay:{
        flex:1,
        backgroundColor:"#131313",
        justifyContent:"center",
        alignItems:"center",
    },
    cardContainer:{
        alignItems:"center",
        width:"100%",
    },
    items:{
        gap:10,
        alignItems:"center",
        padding:30,
        paddingTop:"15%",
   
    },
    saveBtn:{
        justifyContent:"center",
        width:55,
        height:50,
        borderRadius:15,
        backgroundColor:"#131313",
        margin:10,
    },
    container:{
        backgroundColor:"rgb(34, 34, 34)",
        borderWidth:1,
        borderColor:"rgb(0, 0, 0)",
        width:"90%",
        minHeight:300,
        flexShrink:0,
        borderRadius:20,
    },
    scrollContents:{
        flexGrow: 1,
    },
    closeBtn:{
        position:"absolute",
        right:0,
        top:0,
        justifyContent:"center",
        width:"25%",
        height:"15%",
    },
   
    text:{
        color:"#f3f3f3c5",
    },
   
})