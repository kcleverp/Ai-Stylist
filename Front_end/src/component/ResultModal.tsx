import { ImageSourcePropType, Modal, StyleSheet, View } from "react-native"
import {useState} from "react"
import Button from "./Button"
import ImageViewer from "./ImageViewer"
import RecommendDeatils from "./RecommendDetailsModal"
import AppText from "./AppText"
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
   
    const [isDetailsVisible, setIsDetailsVisible] = useState<boolean>(false) 
    const onDetailsClose = () => setIsDetailsVisible(false)
    return(
        <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
            <View style={style.modalContainer}>
                <View style={style.closeBtn}>
                    <Button fontColor="#ffffffff" fontSize={25} label="<" onPress={onClose}/>
                </View>
                <AppText style={style.text}>이런 코디 어때요?</AppText>
                <View style={style.imgContainer}>
                    <ImageViewer isLoading={isLoading} WhenLoadingDone={WhenLoadingDone} imgUrl={imgUrl}/>
                    <View style={style.hashtag}>
                        <AppText style={{color:"#dcd4d4", fontSize:15 }}>#해시태그 위치</AppText>
                    </View>
                </View>
                <View style = {style.itemBox}>
                    <AppText style={{color:"#dcd4d4", fontSize:25, marginBottom:5}}>날씨정보 위치</AppText>
                    <AppText style={{color:"#dcd4d4", fontSize:20, margin:5 }}>코디 한줄 요약 위치</AppText>
                    <View style={style.detailsBtn}>
                        <Button variant="SemiBold"fontColor="#fff" fontSize={18} label="세부 정보 보기" styles={{flex:1}} onPress={() => setIsDetailsVisible(true)} />
                    </View>
                </View>
                <RecommendDeatils data={data} isVisible={isDetailsVisible} onClose={onDetailsClose}/>
            </View>
        </Modal>
    )
}

const style = StyleSheet.create({
    modalContainer:{
        alignItems:"center",
        flex:1,
        padding:"3%",
        backgroundColor:"#131313"
    },

    hashtag:{
        backgroundColor:"#1312123a",
        width:"100%",
        alignItems:"center",
        justifyContent:"center",
        position:"absolute",
        zIndex:10,
        bottom:0,
    },

    imgContainer:{
        width:"95%",
        aspectRatio:3 / 4.5,
        alignSelf:"center",
        overflow:"hidden",
    },

    text:{
        color:"#dcd4d4",
        fontSize:18,
        margin:5,
    },

    itemBox:{
        flex:1,
        alignSelf:"stretch",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:30,
    },

    detailsBtn:{
        backgroundColor:"rgb(36, 36, 36)",
        width:"80%",
        alignItems:"stretch",
        height:40,
        borderRadius:30,
        borderWidth:1,
        borderColor: '#434242ac',      
        borderTopColor: '#555',
        margin:10
    },
    result:{
        color:"#fff"
    },
    closeBtn:{
        width:50,
        height:50,
        borderRadius:10,
        position:"absolute",
        top:8,
        left:5,
    }
})