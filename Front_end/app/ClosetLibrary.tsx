import {View, StyleSheet} from "react-native"
import {styles} from "@/src/styles/AppStyle"
import { useEffect, useState } from "react";
import { useUserIdContext } from "@/src/context/UserIdContext";
import { loadClosetData } from "@/src/services/api";
import ClosetChips from "@/src/myClosetComponent/ClosetChips";
export default function ClosetLibrary(){
    const [closet, setCloset] = useState()
    const {userId} = useUserIdContext()
    useEffect(() => {
        const loadCloset = async() => {
            const data = await loadClosetData(userId)
            if(data){
                setCloset(data)
            }
        }
        loadCloset()
    }, [])
    return(
    <View style={styles.container}>
        <ClosetChips data={closet}/>
    </View>
    )
}

const style = StyleSheet.create({
    button:{
        backgroundColor:"#787777cf",
        borderWidth:1,
        borderColor: '#434242ac',      
        borderTopColor: '#555',
        borderRadius:30,
        width:200,
        height:100,
    }
})

