import { Modal, View, StyleSheet, ScrollView } from "react-native"
import { Recommendation } from "../types/schema"
import Button from "./Button"                
import ItemsDetails from "./ItemsDetails"
import AppText from "./AppText"

type props = {
    data:Recommendation|null
    isVisible:boolean
    onClose:() => void
}
export default function RecommendDetails({data, isVisible, onClose}:props) {
    if (data === null){
        return null;
    }
    return (
        <Modal animationType="slide" visible={isVisible} transparent={true} onRequestClose={onClose}>
            <View style={style.modalContainer}>
                <View style={style.dismissArea}>
                    <Button styles={{flex:1}}onPress={onClose}/>
                </View>
                <View style={style.details}>
                    <View style={style.closeBtn}>
                        <Button fontColor="#fff" fontSize={15} label="X" onPress={onClose} />
                    </View>
                    <View style={style.describe}>
                            <AppText variant="SemiBold" style={{fontSize:23,color:"#dcd4d4"}}>코디 아이템 정보</AppText>
                            <AppText style={{fontSize:15,color:"#dcd4d4"}}>아이템 칩을 누르면 비슷한 상품들을 볼수있어요</AppText>
                        </View>
                    <ScrollView contentContainerStyle={style.contents}>
                        <ItemsDetails data={data}/>
                    </ScrollView>
                </View>
            </View>
            
        </Modal>
    )
}

const style = StyleSheet.create({
    describe:{
        width:"100%",
        alignItems:"center",
        paddingBottom:15,
        
    },
    contents:{
        flexGrow:1,
        marginTop:10,
        gap:30,
        paddingBottom:60,
        
    },
    modalContainer:{
        flex:1,
        justifyContent:"flex-end",
    },
    dismissArea:{
        flex:1,
        backgroundColor:"#0000004e"
    },
    result:{
        color:"#d0d2d3ff",
        fontSize:15
    },
    details:{
        backgroundColor:"rgb(36, 36, 36)",
        padding:10,
        justifyContent:"center",
        width:"100%",
        height:"50%",
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
    },
    closeBtn:{
        width:50,
        height:40,
        borderRadius:15,
        position:"absolute",
        top:10,
        right:0,
    }
})