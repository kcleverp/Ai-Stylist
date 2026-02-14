import {View} from "react-native"
import {useState} from "react"
import {styles} from "@/src/styles/AppStyle"
import ClosetView from "@/src/myClosetComponent/ClosetView"
import { ClosetItem } from "@/src/types/schema"
export default function Closet(){
    const [imgList, setImgList] = useState<ClosetItem[]>([])


    return(
        <View style={styles.container}>
            <View style={styles.closetArea}>
                <ClosetView imgList={imgList} setImgList={setImgList}/>
            </View>
        </View>
    )
}