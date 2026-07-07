import {View} from "react-native"
import {useState} from "react"
import {styles} from "@/src/styles/AppStyle"
import ClosetView from "@/src/myClosetComponent/ClosetView"
import { ClosetItem } from "@/src/types/schema"
import { useLocalSearchParams } from "expo-router";
export default function MyCloset(){
    const [imgList, setImgList] = useState<ClosetItem[]>([])
    const params = useLocalSearchParams()
    const rawClosetId = params?.closetId;
    const closetId = Array.isArray(rawClosetId) ? rawClosetId[0] : rawClosetId;
    return(
        <View style={styles.container}>
            <ClosetView imgList={imgList} setImgList={setImgList} closetId={closetId}/>
        </View>
    )
}