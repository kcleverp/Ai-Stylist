import { Modal, View, StyleSheet, Text, ScrollView } from "react-native"
import Button from "./Button"                
import ItemsDetails from "./ItemsDetails"

interface Recommendation {
    cap:string
    top:string
    bottom:string
    shoes:string
    acc:string
}

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
                            <Text style={{fontSize:25,color:"#fff"}}>코디 상세</Text>
                            <Text style={{fontSize:15,color:"#fff"}}>트렌드와 당신의 정보를 조합한 맞춤형 코디입니다</Text>
                        </View>
                    <ScrollView contentContainerStyle={style.contents}>
                        <ItemsDetails data={data}/>
                    </ScrollView>
                    {/* {data.cap &&
                        <Text style={style.result}>모자:{data.cap}</Text>}
                    <Text style={style.result}>상의:{data.top}</Text>
                    <Text style={style.result}>하의:{data.bottom}</Text>
                    <Text style={style.result}>신발:{data.shoes}</Text>
                    {data.acc &&
                        <Text style={style.result}>악세사리:{data.acc}</Text>} */}
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
        backgroundColor:"#2e2e2eff",
        padding:10,
        justifyContent:"center",
        width:"100%",
        height:"50%",
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        // position:"absolute",
        // bottom:0,
        
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