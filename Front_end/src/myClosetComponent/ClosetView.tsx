import { useState } from "react";
import { ScrollView,View,Image } from "react-native";
import AppText from "../component/AppText";
import { imgList } from "../types/schema";
import Button from "../component/Button";
import { pickingImg } from "@/src/services/function"
import { styles } from "../styles/AppStyle";
export default function ClosetView({imgList,setImgList}:imgList){
    const removeItem = (id:string) => {
        setImgList(imgList.filter(item => item.id !== id))
    }
    
    return(
        <View style={styles.closetArea}>
            <ScrollView  contentContainerStyle={styles.closetContents}>
                <Button fontColor="#dcd4d4" styles={styles.imgInputButton} fontSize={40} label="＋" onPress={() => pickingImg({imgList,setImgList})}/>
                {imgList && imgList.map((item) => (
                    <View style={styles.imgChip}key={item.id}>
                        <Image style={styles.imgView} source={{uri: item.img}}/>
                        <Button fontColor="#dcd4d4" styles={styles.imgClose} label="X" onPress={() => removeItem(item.id)}/>
                    </View>
                ))}
            </ScrollView>
            <Button label="등록" fontColor="#dcd4d4" styles={styles.closetSaveBtn} onPress={() => alert("등록")}/>
        </View>
    )
}
