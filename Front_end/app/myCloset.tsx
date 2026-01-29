import {View} from "react-native"
import {useState} from "react"
import AppText from "@/src/component/AppText"
import {styles} from "@/src/styles/AppStyle"
import Button from "@/src/component/Button"
import ClosetView from "@/src/myClosetComponent/ClosetView"
import { pickingImg } from "@/src/services/function"
import { ClosetItem } from "@/src/types/schema"
export default function Closet(){
    const [imgList, setImgList] = useState<ClosetItem[]>([])


    return(
        <View style={styles.container}>
            <View style={styles.closetArea}>
                <ClosetView imgList={imgList} setImgList={setImgList}/>
            </View>
            <View style={styles.footer}>
                    <Button fontColor="#dcd4d4" styles={styles.textButton}fontSize={20} label="아이템 추가" onPress={() => pickingImg({imgList,setImgList})}/>
            </View>
        </View>
    )
}