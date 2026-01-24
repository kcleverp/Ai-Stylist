import React, {useEffect, useState} from "react"
import { checkFirstLaunch } from "../services/function";
import {Modal, View, StyleSheet, Linking} from "react-native"
import AppText from './AppText';
import Button from "./Button";

interface props{
    isModalOpen:boolean
    setIsModalOpen:(para:boolean) => void
}
export default function FirstLaunchModal({isModalOpen, setIsModalOpen}:props){
    const onPress = async () => {
        const url = "https://kcleverp.github.io/Ai-Stylist-App-privacy/"
        const supported = await Linking.canOpenURL(url);
        if(supported){
            await Linking.openURL(url)
        }else{
            alert("문제가 발생했어요 Url을 열수없어요")
        }
    }

    const todo = (para:boolean) => {
        setIsModalOpen(para)
    }
    useEffect(() => {
        checkFirstLaunch(todo)
    }, [])
    return(
        <Modal visible={isModalOpen} animationType="slide" transparent={true} onRequestClose={() => setIsModalOpen(false)}>
            <View style={style.modalContainer}>
                <View style={style.contents}>
                    <AppText variant="Bold" style={style.Htext}>개인정보 이용 안내</AppText>
                    <AppText  style={style.text}>이 어플은 날씨 및 체형 기반 코디 추천을 생성합니다.{"\n"}
                        이를 위해 위치, 키/체중 및 성별 정보를 사용합니다.{"\n"}
                        해당 정보들은 저장되지 않으며 앱 사용 중에만 활용됩니다.{"\n"}
                    </AppText>
                    <Button label="안내 자세히 보기" styles={style.detailBtn} fontColor="#fff" onPress={() => onPress()}/>
                    <Button styles={style.button} fontColor="#fff" onPress={() => setIsModalOpen(false)} label="확인"/>
                </View>
            </View>
        </Modal>
    )
} 

const style = StyleSheet.create({
    modalContainer:{
        flex:1,
        justifyContent:"center"
    },
    Htext:{
        color:"#dcd4d4",
        fontSize:18,
    },
    detailBtn:{
        backgroundColor:"#333232c1",
        borderWidth:1,
        borderColor: '#434242ac',      
        borderTopColor: '#555',
        borderRadius:10,
        width: 150,
        height: 50,
    },
    contents:{
        alignItems:"center",
        padding:25,
        gap: 5,
        backgroundColor:"rgb(34, 34, 34)",
        borderWidth:1,
        borderColor:"rgb(0, 0, 0)",
        borderRadius:30,
        height:400,
    },
    text:{
        color:"#dcd4d4",
        fontSize:15,
        lineHeight:25,
    },
    button:{
        backgroundColor:"#333232c1",
        borderWidth:1,
        borderColor: '#434242ac',      
        borderTopColor: '#555',
        borderRadius:10,
        width: 100,
        height: 50,
        position:"absolute",
        bottom:30,
    }
})