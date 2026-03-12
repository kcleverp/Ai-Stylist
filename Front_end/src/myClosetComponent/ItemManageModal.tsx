import {Modal, View, StyleSheet, ScrollView} from "react-native"
import { Item } from "../types/schema"
import AppText from "../component/AppText"
import { useSelectedItemsContext } from "../context/SelectedItemsContext"
import Button from "../component/Button"
interface props {
    visible:boolean,
    onClose:() => void,
}

export default function ItemManageModal({visible, onClose}:props){
    const {items, toggleItem} = useSelectedItemsContext()
    return(
        <Modal animationType={"slide"} transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={style.modalContainer}>
                <View style={style.scrollContainer}>
                <ScrollView contentContainerStyle={style.contentsContainer}>
                    {items.map((item:Item) => (
                        <Button
                            key={item.id}
                            label={item.for_front}
                            styles={style.chip}
                            fontColor="#dcd4d4"
                            onPress={() => {
                                const itemProp = {id:item.id, for_front:item.for_front}
                                toggleItem(itemProp)
                                }}/>
                            )
                        )
                    }
                </ScrollView>
                <AppText variant="SemiBold" style={style.mainText}>선택된 의상</AppText>
                <Button label="X" onPress={onClose} fontColor="#dcd4d4" styles={style.closeBtn}/>
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
    scrollContainer:{
        height:400,
        width:300,
        backgroundColor:"rgb(34, 34, 34)",
        borderWidth:1,
        borderColor:"rgb(0, 0, 0)",
        borderRadius:30,
    },
    contentsContainer:{
        flex:1,
        flexDirection:"row",
        flexWrap:"wrap",
        padding:20,
        paddingTop:60,
        gap:20,
    },
    chip:{
        backgroundColor:"#333232c1",
        borderWidth:1,
        borderColor: '#434242ac',      
        borderTopColor: '#555',
        elevation:10,
        width:"45%",
        height:65,
        borderRadius:20,
        paddingVertical: 10,
        alignItems:"center",
    },
    mainText:{
        fontSize:18,
        top:20, 
        color:"#dcd4d4",
        position:"absolute",
        alignSelf:"center"
    },
    closeBtn:{
        position:"absolute",
        right:5,
        top:10,
        width:45,
        height:45,
    }
}) 