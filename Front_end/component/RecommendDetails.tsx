import { StyleSheet, Text } from "react-native"
                
interface Recommendation {
    cap:string
    top:string
    bottom:string
    shoes:string
    acc:string
}

type props = {
    data:Recommendation|null
}
export default function RecommendDetails({data}:props) {
    if (data === null){
        return null;
    }
    return (
        <>
            {data.cap &&
                <Text style={style.result}>모자:{data.cap}</Text>}
            <Text style={style.result}>상의:{data.top}</Text>
            <Text style={style.result}>하의:{data.bottom}</Text>
            <Text style={style.result}>신발:{data.shoes}</Text>
            {data.acc &&
                <Text style={style.result}>악세사리:{data.acc}</Text>}
        </>
    )
}

const style = StyleSheet.create({
    result:{
        color:"#fff"
    },
})