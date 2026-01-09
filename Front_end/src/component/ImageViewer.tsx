import { ActivityIndicator, Image, ImageSourcePropType, StyleSheet, View } from "react-native"

type props = {
    imgUrl: string | ImageSourcePropType | undefined
    isLoading: boolean
    WhenLoadingDone: () => void
}
export default function ImageViewer({imgUrl, isLoading, WhenLoadingDone}:props){
    return(
        <View style={style.container}>
         
            <View style={style.loadingOverLay}>
                <ActivityIndicator animating={isLoading} size="large"/>
            </View>
            <Image source={typeof imgUrl === "string" ? {uri:imgUrl}: imgUrl} style={[style.image, {opacity: isLoading ? 0 : 1}]} onLoad={WhenLoadingDone} resizeMode="cover"/>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1
    },
    loadingOverLay:{
        ...StyleSheet.absoluteFillObject,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:10,
        backgroundColor:"#000000ff",
        shadowColor:"#000000ff",
        shadowOpacity:0.5,
        shadowOffset:{width:0, height:10},
        shadowRadius:10,

    },
    image:{
        width:"100%",
        height:"100%",
        borderRadius:30,
    }
})