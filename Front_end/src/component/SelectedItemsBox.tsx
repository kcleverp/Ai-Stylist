import {View, StyleSheet} from "react-native"
import Button from "./Button"
import { useState } from "react"
import { useSelectedItemsContext } from "../context/SelectedItemsContext"
import ItemManageModal from "../myClosetComponent/ItemManageModal"
export default function SelectedItemsBox(){
    const {items} = useSelectedItemsContext()
    const [isClicked, setIsClicked] = useState<boolean>(false)
    return(
        <View style={style.container}>
            {items.length > 0 &&
                <Button label={`선택된 아이템: ${items.length}`} fontColor="#dcd4d4" styles={style.button} onPress={() => setIsClicked(true)}/>}
            <ItemManageModal visible={isClicked} onClose={() => setIsClicked(false)}/>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        width:"70%",
        height:45,
        position:"absolute",
        alignSelf:"center",
        justifyContent:"center",
        borderRadius:15,
        top:80,
    },
    button:{
        flex:1,
        backgroundColor:"#1a1a1ac5",
        alignSelf:"center"
    },
})