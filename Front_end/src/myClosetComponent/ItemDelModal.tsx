import {Modal, View, StyleSheet} from "react-native"
import AppText from "../component/AppText"
import Button from "../component/Button"
import { delItemData } from "../services/api"
import { useUserIdContext } from "../context/UserIdContext"
import { Data } from "../types/schema"
interface props {
    visible:boolean,
    onClose:() => void,
    data:Data[],
    setData:(para:Data[]) => void,
    closetId:string
    itemId:string
}

export default function ItemDelModal({visible, onClose, data, setData, closetId, itemId}:props){
    const {userId} = useUserIdContext()
    return(
        <Modal animationType={"slide"} transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={style.modalContainer}>
                <View style={style.contentsContainer}>
                    <AppText variant="SemiBold" style={style.mainText}>아이템 편집하기</AppText>
                    <View style={style.buttonsContainer}>    
                        <Button styles={style.button} fontColor="#dcd4d4" fontSize={16} label="삭제" 
                        onPress= {async() => {
                            const response = await delItemData(userId, closetId, itemId)
                            onClose()
                        }}/>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const style = StyleSheet.create({
    modalContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    text:{
        fontSize:15,
        color:"#dcd4d4",
        alignSelf:"center",
        margin:30,
    },
    closetSaveBtn:{
        borderRadius:30,
        width: 50,
        marginLeft:30,
        height: 40,
        alignSelf:"center"
    },
    input:{
        height:50,
        width:"60%",
        color:"#dcd4d4",
        fontSize:14,
        borderRadius:30,
        textAlignVertical: 'center',
        includeFontPadding: false,
        outline:"none",
    },
    panel:{
        flexDirection:"row",
        borderRadius:25,
        justifyContent:"center",
        alignItems:"center",
        height:50,
        width:"90%",
        backgroundColor:"#474545c1",
        alignSelf:"center"
    },
    contentsContainer:{
        height:300,
        width:350,
        backgroundColor:"rgb(34, 34, 34)",
        borderWidth:1,
        borderColor:"rgb(0, 0, 0)",
        borderRadius:30,
        padding:20,
        paddingTop:60,
    },
    buttonsContainer:{
        flexDirection:"row",
        flexWrap:"wrap",
        gap:40,
        flex:1,
    },
    buttonContainer:{
        alignItems:"center",
        justifyContent:"center",
        flex:1,
    },
    button:{
        backgroundColor:"#333232c1",
        borderWidth:1,
        borderColor: '#434242ac',      
        borderTopColor: '#555',
        borderRadius:10,
        width: 100,
        height: 50,
    },
    mainText:{
        fontSize:18,
        top:20, 
        color:"#dcd4d4",
        alignSelf:"center",
        position:"absolute",
    }

}) 