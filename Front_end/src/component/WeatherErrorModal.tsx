import {Modal, View, StyleSheet} from "react-native"
import AppText from "./AppText"
import Button from "./Button"
interface props {
    visible:boolean
    onClose:() => void
    retry: () => void
}

export default function WeatherErrorModal({visible, onClose, retry}:props){
    return(
        <Modal animationType={"slide"} transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={style.modalContainer}>
                <View style={style.contentsContainer}>
                    <AppText variant="SemiBold" style={style.text}>날씨 정보를 받아오는데 실패 했어요</AppText>
                    <View style={style.buttonsContainer}>
                        <View style={style.buttonContainer}>
                            <Button styles={style.button} fontColor="#dcd4d4" fontSize={16} label="기본값으로" onPress={onClose}/>
                        </View>
                        <View style={style.buttonContainer}>
                            <Button styles={style.button} fontColor="#dcd4d4" fontSize={16} label="재시도" onPress= {retry}/>
                        </View>
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
    contentsContainer:{
        height:300,
        width:350,
        backgroundColor:"rgb(34, 34, 34)",
        borderWidth:1,
        borderColor:"rgb(0, 0, 0)",
        borderRadius:30,
        padding:20,
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
    text:{
        fontSize:18,
        top:20, 
        color:"#dcd4d4",
        alignSelf:"center"
    }

}) 