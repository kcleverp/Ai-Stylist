import AsyncStorage from "@react-native-async-storage/async-storage"
import * as ImagePicker from "expo-image-picker"
import { useState } from "react"
import { ClosetItem } from "../types/schema"
import 'react-native-get-random-values'
import {v4 as uuidv4} from "uuid"
type props = (para:boolean) => void

export const checkFirstLaunch = async(todo:props) => {
    try{
        const hasLaunched = await AsyncStorage.getItem("HAS_LAUNCHED");

        if(hasLaunched === null){
            await AsyncStorage.setItem("HAS_LAUNCHED", "true");
            todo(true)
        }else{
            todo(false)
        }
    }catch(error){
        console.error("첫 실행 확인 중 오류", error);
    }
}
interface prop{
    imgList:ClosetItem[]|null
    setImgList:(item:ClosetItem[]) => void
}
export const pickingImg = async({imgList, setImgList}:prop) =>{
   
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted"){
        alert("기능 사용을 위해선 권한이 필요해요")
        return null
    }
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8
    })
    if (!result.canceled){
        const data = {
            id:uuidv4(),
            img:result.assets[0].uri,
            assetId:result.assets[0].uri
        } 
        const currentList = imgList || []
        const isDuplicate = currentList.some(item => item.assetId === data.assetId)
        console.log(currentList)
        if (isDuplicate){
            return null
        }else{
            const updatedList = [...currentList, data]
            setImgList(updatedList)
        }
    }
}