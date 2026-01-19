import { ActivityIndicator, Image, ImageSourcePropType, StyleSheet, View } from "react-native"
import { useState, useEffect } from "react";
import { requestImagen } from "../services/api";
import { ForImage } from "../types/schema";
import Button from "./Button";
import AppText from "./AppText";
type props = {
    imgUrl: string | ImageSourcePropType | null
    gender: string
    forImage: ForImage | null
    isLoading: boolean
    WhenLoadingDone: () => void
}



export default function ImageViewer({imgUrl, gender, forImage, isLoading, WhenLoadingDone}:props){
    
    const [Url,setUrl] = useState<string|ImageSourcePropType|null>(imgUrl)
    
    useEffect(() => {
        setUrl(imgUrl);
    }, [imgUrl]);

    const onPress = async() => {
        setIsRetry(true)
        if (forImage){
            setUrl(await requestImagen(forImage, gender))
        }
        setIsRetry(false)
    }

    const serverUrl = process.env.EXPO_PUBLIC_SERVER_URL;

    const displayUrl = Url ? `${serverUrl}/${Url}` : undefined
        
    const [isRetry, setIsRetry] = useState<boolean>(false)

    return(
        <View style={style.container}>
            <View style={style.loadingOverLay}>
                {(Url !== "failed" || isRetry) &&
                    <ActivityIndicator animating={isLoading} size="large"/>}
                {(Url === "failed" && !isRetry) &&
                    <View style={style.failedContainer}>
                        <AppText variant="SemiBold" style={style.text}>어라 이미지를 생성하지 못했어요</AppText>
                        <Button variant="Bold" fontColor="#dcd4d4" styles={style.button} fontSize={18} label="재시도" onPress ={() => onPress()}/>
                    </View>}
            </View>
            {Url && Url !== "failed" &&
                <Image source={typeof displayUrl === "string" ? {uri:displayUrl}: displayUrl} style={[style.image, {opacity: isLoading ? 0 : 1}]} onLoad={WhenLoadingDone} resizeMode="cover"/>}
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        overflow: 'hidden',      
        backgroundColor: '#000',
        borderRadius: 20,
    },
    failedContainer:{
        justifyContent:"center",
        gap:20
    },
    text:{
        color:"#dcd4d4",
        alignSelf:"stretch",
        fontSize:16
    },
    button:{
        alignSelf:"center",
        width:150,
        height:50,
        backgroundColor:"#333232c1",
        borderWidth:1,
        borderRadius:30,
        borderColor: '#434242ac',      
        borderTopColor: '#555',
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