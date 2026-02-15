import { ScrollView,View,Image } from "react-native";
import AppText from "../component/AppText";
import { imgList } from "../types/schema";
import Button from "../component/Button";
import { pickingImg } from "@/src/services/function"
import { styles } from "../styles/AppStyle";
import { sendToAnalyze } from "../services/api";
import { useUserIdContext } from "../context/UserIdContext";
export default function ClosetView({imgList,setImgList}:imgList){
    const removeItem = (id:string) => {
        setImgList(imgList.filter(item => item.id !== id))
    }
    const {userId} = useUserIdContext(); 
    return(
        <View style={styles.closetArea}>
            <AppText style={styles.text}>옷장에 등록할 아이템의 이미지를 올려주세요</AppText>
            <AppText style={styles.text}>인공지능이 분석해 아이템을 뽑아줍니다</AppText>
            <ScrollView  contentContainerStyle={styles.closetContents}>
                <Button fontColor="#dcd4d4" styles={styles.imgInputButton} fontSize={40} label="＋" onPress={() => pickingImg({imgList,setImgList})}/>
                {imgList && imgList.map((item) => (
                    <View style={styles.imgChip}key={item.id}>
                        <Image style={styles.imgView} source={{uri: item.img}}/>
                        <Button fontColor="#dcd4d4" styles={styles.imgClose} label="X" onPress={() => removeItem(item.id)}/>
                    </View>
                ))}
            </ScrollView>
            <Button label="이 아이템으로 옷장만들기" fontColor="#dcd4d4" 
            styles={!userId ? {...styles.closetSaveBtn, opacity: 0.5} : styles.closetSaveBtn} 
            onPress={() => {
                if(!userId){
                    alert("사용자님의 정보를 불러오고 있어요. 잠시만 기다려주세요!");
                    return null;
                }
                sendToAnalyze(imgList,userId)}}/>
        </View>
    )
}
