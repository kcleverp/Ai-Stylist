import { ScrollView, View, Image, StyleSheet, TextInput,KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import AppText from "../component/AppText";
import { imgList } from "../types/schema";
import Button from "../component/Button";
import { pickingImg } from "@/src/services/function"
import { styles } from "../styles/AppStyle";
import { sendToAnalyze } from "../services/api";
import { useUserIdContext } from "../context/UserIdContext";
import { useNavigateTo } from "../services/useNavigateTo";
export default function ClosetView({imgList,setImgList}:imgList){
    const [name, setName] = useState<string>("")
    const removeItem = (id:string) => {
        setImgList(imgList.filter(item => item.id !== id))
    }
    const {navigateTo} = useNavigateTo()
    const {userId} = useUserIdContext(); 
    return(
        <KeyboardAvoidingView style={styles.closetArea} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <AppText style={styles.text}>옷장에 등록할 아이템의 이미지를 올려주세요</AppText>
            <AppText style={styles.text}>인공지능이 분석해 아이템을 추출합니다</AppText>
            <ScrollView style={styles.closetContentsContainer}contentContainerStyle={styles.closetContents}>
                <Button fontColor="#dcd4d4" styles={styles.imgInputButton} fontSize={40} label="＋" onPress={() => pickingImg({imgList,setImgList})}/>
                {imgList && imgList.map((item) => (
                    <View style={styles.imgChip} key={item.id}>
                        <Image style={styles.imgView} source={{uri: item.img}}/>
                        <Button fontColor="#dcd4d4" styles={styles.imgClose} label="X" onPress={() => removeItem(item.id)}/>
                    </View>
                ))}
            </ScrollView>
            <View style={style.footerArea}>
                <View style={style.panel}>
                    <TextInput value={name} onChangeText={(text) => setName(text)} style = {style.input} placeholder="✎ 새로운 옷장이름" placeholderTextColor="rgb(200, 200, 200)"/>
                    <Button label="생성⚒" fontColor="#dcd4d4" 
                    styles={(!userId || !name) ? {...style.closetSaveBtn, opacity: 0.5} : style.closetSaveBtn} 
                    onPress={() => {
                        if(!userId || !name){
                            alert("사용자님의 정보를 불러오고 있어요. 잠시만 기다려주세요!");
                            return null;
                        }
                        sendToAnalyze(imgList, userId, name)
                        setName("")
                        setImgList([])}}
                        />
                </View>
                <View style={style.buttonArea}>
                    <Button label="📂옷장 목록" fontColor="#dcd4d4" styles={style.button} onPress={() => navigateTo("/ClosetLibrary")}/>
                    <Button label="🔍의류 탐색" fontColor="#dcd4d4" styles={style.button} onPress={() => alert("개발중입니다")}/>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const style = StyleSheet.create({
    buttonArea:{
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        borderRadius:30
    },
    button:{
        flex:1,
        padding:5,
    },
    footerArea:{
        width:"90%",
        height:100,
        borderRadius:20,
        backgroundColor:"rgb(31, 31, 31)",
        
    },
    input:{
        height:50,
        width:200,
        color:"#dcd4d4",
        fontSize:14,
        borderRadius:30,
        textAlignVertical: 'center',
        includeFontPadding: false,
        outline:"none",
    },
    panel:{
        flexDirection:"row",
        borderRadius:25,
        justifyContent:"center",
        alignItems:"center",
        height:50,
        width:300,
    },
    closetSaveBtn:{
        borderRadius:30,
        width: 50,
        marginLeft:30,
        height: 40,
        alignSelf:"center"
    },
})
