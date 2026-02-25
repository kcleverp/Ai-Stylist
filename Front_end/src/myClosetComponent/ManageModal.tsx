import {Modal, View, StyleSheet, TextInput} from "react-native"
import { useState } from "react"
import AppText from "../component/AppText"
import Button from "../component/Button"
import { editData } from "../services/api"
interface props {
    visible:boolean,
    onClose:() => void,
    data: any,
    setData:(para:any[]) => void,
    del:() => void,
    closetId:string
}

export default function ManageModal({visible, onClose, data, setData, del, closetId}:props){
    const [isPicked, setIsPicked] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    return(
        <Modal animationType={"slide"} transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={style.modalContainer}>
                <View style={style.contentsContainer}>
                    <AppText variant="SemiBold" style={style.mainText}>옷장 편집하기</AppText>
                    {isPicked && <AppText variant="SemiBold" style={style.text}>새로운 이름을 지어주세요</AppText>}
                    {!isPicked &&
                    <View style={style.buttonsContainer}>    
                        <View style={style.buttonContainer}>
                            <Button styles={style.button} fontColor="#dcd4d4" fontSize={16} label="이름수정하기" 
                            onPress={() => {
                                setIsPicked(true)
                                }}/>
                        </View>
                        <View style={style.buttonContainer}>
                            <Button styles={style.button} fontColor="#dcd4d4" fontSize={16} label="삭제" onPress= {del}/>
                        </View>
                    </View>}
                    {isPicked &&
                        <View style={style.panel}>
                            <TextInput value={name} onChangeText={(text) => setName(text)} style = {style.input} placeholder="✎ 새로운 옷장이름" placeholderTextColor="rgba(200, 200, 200, 0.7)"/>
                            <Button label="수정⚒" fontColor="#dcd4d4" 
                            styles={(!name) ? {...style.closetSaveBtn, opacity: 0.5} : style.closetSaveBtn} 
                            onPress={async() => {
                                if(!name){
                                    alert("새로운 이름을 입력해주세요!");
                                    return null;
                                }
                                const response = await editData(closetId, name)
                                if(response){
                                    const editedList = data.map((item:any) => (
                                    item.closet_id === closetId ? {...item, name: name} : item))
                                    setData(editedList)
                                    setName("")
                                    setIsPicked(false)
                                    onClose()
                                }else{
                                    alert("이름 수정에 실패했어요")
                                }
                                }}/>
                        </View>}
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