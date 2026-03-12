import AppText from "@/src/component/AppText";
import { View } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "@/src/styles/AppStyle";
import { loadItemData } from "@/src/services/api";
import { useLocalSearchParams } from "expo-router";
import { useUserIdContext } from "@/src/context/UserIdContext";
import ClosetItemChips from "@/src/myClosetComponent/ClosetItemChips";
import { Data } from "@/src/types/schema";
export default function ClosetItems(){
    const params = useLocalSearchParams()
    const {closetId} = params
    const safeClosetId = Array.isArray(closetId) ? closetId[0] : closetId;
    const {userId} = useUserIdContext()
    const [itemData,setItemData] = useState<Data>()
    useEffect(() => {
        if (!userId || !safeClosetId) {
            return;
        }
        const loadCloset = async() => {
            const data = await loadItemData(userId, safeClosetId)   
            if(data){
                setItemData(data)
            }
        }
        loadCloset()
    }, [userId, safeClosetId])
    return(
        <View style={styles.container}>
            {itemData &&
                <ClosetItemChips data = {itemData} closetId ={safeClosetId} setData={setItemData}/>}
        </View>
    )
}
