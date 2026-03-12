import { ScrollView, StyleSheet, View } from "react-native"
import Button from "../component/Button"
import { Data } from "../types/schema"
import AppText from "../component/AppText"
import { useState } from "react"
import ImageViewer from "../component/ImageViewer"
import { useSelectedItemsContext } from "../context/SelectedItemsContext"
import { Item } from "../types/schema"
interface prop{
    data:Data,
    setData:(para:Data) => void
    closetId:string
}
export default function ClosetItemChips({data, setData, closetId}:prop){
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [currentImg, setCurrentImg] = useState<string>("")
    const {items, toggleItem} = useSelectedItemsContext()
    return(
        <View style={style.container}>
            <ImageViewer imgUrl={currentImg} isLoading={isLoading} WhenLoadingDone={() => setIsLoading(false)}/>
            <AppText style={style.text}>저장된 아이템</AppText>
            <ScrollView showsHorizontalScrollIndicator={false} style={style.chipContainer} contentContainerStyle={style.chipItemStyle} >
                {data && data.map((item:any) => (
                    <Button
                    key={item.id}
                    label={item.for_front}
                    styles={[style.chip, (items.some((data:Item) => data.id === item.id)) && style.selected ]}
                    fontColor="#dcd4d4"
                    onPress={() => {
                        setCurrentImg(item.image_url)
                        const itemProp = {id:item.id, for_front:item.for_front, closetId:closetId}
                        toggleItem(itemProp)
                        console.log(items)
                        }
                    }
                    onLongPress={() => {
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