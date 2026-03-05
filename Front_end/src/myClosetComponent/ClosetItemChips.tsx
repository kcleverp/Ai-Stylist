import { ScrollView, StyleSheet, View } from "react-native"
import Button from "../component/Button"
import { Data } from "../types/schema"
import AppText from "../component/AppText"
import { useState } from "react"
import ImageViewer from "../component/ImageViewer"

interface prop{
    data:Data,
    setData:(para:Data) => void
}

export default function ClosetItemChips({data, setData}:prop){
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [pickedItem, setPickedItem] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [currentImg, setCurrentImg] = useState<string>("")
    return(
        <View style={style.container}>
            <ImageViewer imgUrl={currentImg} isLoading={isLoading} WhenLoadingDone={() => setIsLoading(false)}/>
            <AppText style={style.text}>저장된 아이템</AppText>
            <ScrollView showsHorizontalScrollIndicator={false} style={style.chipContainer} contentContainerStyle={style.chipItemStyle} >
                {data && data.map((item:any) => (
                    <Button
                    key={item.id}
                    label={item.for_front}
                    styles={(pickedItem === item.id) ? [style.chip, style.selected] : style.chip}
                    fontColor="#dcd4d4"
                    onPress={() => {
                        setCurrentImg(item.image_url)
                        console.log(item.image_url)}}
                    onLongPress={() => {
                        setPickedItem(item.id)
                        setIsVisible(true)}}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
    },
    selected:{
        backgroundColor:"#171717",
        borderRadius:10,
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