import Button from "./Button"
import ImageViewer from "./ImageViewer"
import RecommendDeatils from "./RecommendDetailsModal"
import AppText from "./AppText"
import { Contents } from "../types/schema"
import { Modal, StyleSheet, View } from "react-native"
import {useState} from "react"
import Hashtags from "./Hashtags"

type props = {
    data: Contents|null
    gender:string
    isVisible: boolean
    onClose:() => void
    isLoading: boolean
    WhenLoadingDone:() => void
}
export default function ResultModal({data, gender, isVisible, onClose, isLoading, WhenLoadingDone}:props){
    const recommendation = data?.data.recommendation
    const [currentIndex, setCurrentIndex] = useState(0);
    const {imgUrl = null, for_image = null} = recommendation || {}
    const {for_answer = null, style_analysis = null , hashtags = null} =  recommendation?.style || {}
    

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
                    <ImageViewer isLoading={isLoading} gender={gender} WhenLoadingDone={WhenLoadingDone} imgUrl = {imgUrl} forImage = {for_image} />
                    <View style={style.hashtag}>
                        <Hashtags hashtags={hashtags}/>
                    </View>
                </View>
                <View style = {style.itemBox}>
                    <View style={style.analysisBox}>
                    {style_analysis !== null ?( 
                        <AppText variant="SemiBold" style={{color:"#dcd4d4", fontSize:16, }}>{style_analysis}</AppText>): null} 
                    {style_analysis === null? (
                        <AppText variant="SemiBold" style={{color:"#dcd4d4", fontSize:16, }}>사용자님의 코디를 생성중이에요</AppText>): null}
                    </View>
                    <View style={style.detailsBtn}>
                        <Button variant="Bold"fontColor="#dcd4d4" fontSize={18} label="코디 아이템 보기" styles={{flex:1}} onPress={() => setIsDetailsVisible(true)} />
                    </View>
                </View>
                <RecommendDeatils data={for_answer} isVisible={isDetailsVisible} onClose={onDetailsClose}/>
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
    analysisBox:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        margin:10,
        backgroundColor:"#22212176",
        width:"100%",
        height:60,
        borderRadius:30,
        borderWidth: 1,
        borderColor: 'rgba(159, 155, 155, 0.18)'
    },
    hashtag:{
        backgroundColor:"#13121287",
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
        margin:15,
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
        top:20,
        left:5,
    }
})