import { ImageSourcePropType, Modal, StyleSheet, Text, View } from "react-native"
import Button from "./Button"
import ImageViewer from "./ImageViewer"
import RecommendDeatils from "./RecommendDetails"
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
    imgUrl: string|ImageSourcePropType | undefined
    isLoading:boolean
    WhenLoadingDone:() => void
}
export default function ResultModal({data, imgUrl, isVisible, onClose, isLoading, WhenLoadingDone}:props){
    return(
        <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
            <View style={style.modalContainer}>
                <Text style={style.text}>이런 코디 어떄요?</Text>
                <View style={style.imgContainer}>
                    <ImageViewer isLoading={isLoading} WhenLoadingDone={WhenLoadingDone} imgUrl={imgUrl}/>
                </View>
                <View style = {style.itemBox} >
                    <RecommendDeatils data={data}/>
                </View>
                <View style={style.closeBtn}>
                    <Button fontColor="#020202ff" label="닫기" onPress={onClose}/>
                </View>
                
            </View>
        </Modal>
    )
}

const style = StyleSheet.create({
    modalContainer:{
        alignItems:"center",
        flex:1,
        padding:"8%",
        backgroundColor:"#000000ff"
    },
    imgContainer:{
        flex:0.8,
        aspectRatio:3 / 4,
        alignSelf:"center",
        
        margin:5
    },
    text:{
        color:"#fffafaff",
        fontSize:18,
        margin:5
    },
    itemBox:{
        flex:0.2,
        alignItems:"center",
        padding:10,
    },
    result:{
        color:"#fff"
    },
    closeBtn:{
        backgroundColor:"#fff",
        width:50,
        height:30,
        borderRadius:10,

    }
})