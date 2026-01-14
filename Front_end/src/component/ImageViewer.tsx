import { ActivityIndicator, Image, ImageSourcePropType, StyleSheet, View } from "react-native"

type props = {
    imgUrl: string | ImageSourcePropType | null
    isLoading: boolean
    WhenLoadingDone: () => void
}



export default function ImageViewer({imgUrl, isLoading, WhenLoadingDone}:props){
    
    const serverUrl = process.env.EXPO_PUBLIC_SERVER_URL;
    const displayUrl = `${serverUrl}${imgUrl}?t=${new Date().getTime()}` || undefined
    return(
        <View style={style.container}>
         
            <View style={style.loadingOverLay}>
                <ActivityIndicator animating={isLoading} size="large"/>
            </View>
            <Image source={typeof displayUrl === "string" ? {uri:displayUrl}: displayUrl} style={[style.image, {opacity: isLoading ? 0 : 1}]} onLoad={WhenLoadingDone} resizeMode="cover"/>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        overflow: 'hidden',      // 삐져나온 이미지 숨김 (핵심!)
        backgroundColor: '#000',
        borderRadius: 20,
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