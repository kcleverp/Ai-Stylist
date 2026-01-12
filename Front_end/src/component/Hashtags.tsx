import AppText from "./AppText";
import {View, StyleSheet} from "react-native"

type props = {
    hashtags:string[] | null
}

export default function Hashtags({hashtags}:props){
    if (!hashtags){
        return null
    }
    return(
        <View style={style.hashtagsContainer}>
            {hashtags.map((tag) =>(
                <AppText key={tag} variant="SemiBold" style={style.hashtag}>{tag}</AppText>
            ))}
        </View>
    )
}

const style = StyleSheet.create({
    hashtagsContainer:{
        flexDirection:"row",
        gap:10,
    },
    hashtag:{
        color:"#cdc4c4", 
        fontSize:12, 
        opacity: 0.8,
        backgroundColor: '#3736366c', 
        borderRadius: 20,
        padding: 6,
        borderWidth: 1,
        borderColor: 'rgba(238, 238, 238, 0.18)'
    }
})