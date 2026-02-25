import { ScrollView, StyleSheet, View } from "react-native"
import Button from "../component/Button"
import { useNavigateTo } from "../services/useNavigateTo"
import AppText from "../component/AppText"
import { useState } from "react"
import ManageModal from "./ManageModal"
interface prop{
    data:any,
    setData:(para:any[]) => void
}

export default function ClosetChips({data, setData}:prop){
    const { navigateTo } = useNavigateTo()
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [pickedCloset, setPickedCloset] = useState<string>("")
    return(
        <View style={style.container}>
            <AppText style={style.text}>칩을 길게눌러 수정해 보세요</AppText>
            <AppText style={style.text}>저장된 옷장</AppText>
            <ScrollView showsVerticalScrollIndicator={false} style={style.chipContainer} contentContainerStyle={style.chipItemStyle} >
                {data && data.map((item:any) => (
                    <Button
                    key={item.closet_id}
                    label={item.name}
                    styles={style.chip}
                    fontColor="#dcd4d4"
                    onPress={() => navigateTo("/ClosetItems", {id: item.closet_id})}
                    onLongPress={() => {
                        setPickedCloset(item.closet_id)
                        setIsVisible(true)}}
                    />
                ))}
            </ScrollView>
            <ManageModal visible={isVisible} onClose={() => setIsVisible(false)} data ={data} setData={setData} del={() => alert("개발중")} closetId={pickedCloset}/>  
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
    },
    chipItemStyle:{
        flexDirection:"row",
        flexWrap: 'wrap',
        gap:20,
    },
    text:{
        color:"#dcd4d4",
        fontSize:15,
        letterSpacing: 1.5,
        marginBottom:30,
        alignSelf:"center",
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
    chipContainer:{
        flex:1,

    }
})