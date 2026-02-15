import { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useUserInfoContext } from "@/src/context/UserInfoContext";
import Button from "../src/component/Button";
import NumInput from "../src/component/NumInput";
import Picker from "../src/component/Picker";
import AppText from "../src/component/AppText";


export default function UserInfo(){
    const {userInfo, updateUserInfo} = useUserInfoContext()
    const items = [
        { label: '스트릿', value: 'trendy_street' },
        { label: '클래식', value: 'classic_heritage' },
        { label: "캐주얼", value: "preppy_youth" },
    ]
    const genders = [
        { label: "남성", value: 'male' },
        { label: '여성', value: 'female' },
    ]
    const [userStyle,setUserStyle] = useState<string>("")
    const [gender,setGender] = useState<string>("")
    const [height,setHeight] = useState<number>(0)
    const [weight,setWeight] = useState<number>(0)
    useEffect(() => {
        if (userInfo.userStyle) {
            setUserStyle(userInfo.userStyle);
            setGender(userInfo.gender);
            setHeight(userInfo.height);
            setWeight(userInfo.weight);
        }
    }, [userInfo]);

    const saveInfo = () => {
        if(!height || !weight || !gender || !userStyle){
            alert("값을 모두 입력해주세요")
            return null
        }
        const cleanInfo = {
        "userStyle": userStyle || "casual", 
        "gender": gender || "male",
        "height":  typeof height === "number" &&(height < 200 && height >= 100 ) ? height : 170 ,
        "weight": typeof weight === "number" && (weight < 200 && weight >= 25 ) ? weight : 60
      }
      const bmi = Number((cleanInfo.weight / ((cleanInfo.height / 100) ** 2)).toFixed(1));
      const finalInfo = {...cleanInfo, bmi}
      updateUserInfo(finalInfo)
    }

    return (
        <View style={style.overlay}>
            <View style={style.cardContainer} >
                <ScrollView style={style.container} contentContainerStyle={style.scrollContents}>
                    <View style={style.items}>
                        <AppText style={style.text}>스타일</AppText>
                        <Picker items={items} value={userStyle} setValue={setUserStyle}/>
                        <AppText style={style.text}>성별</AppText>
                        <Picker items={genders} value={gender} setValue={setGender}/>
                        <NumInput placeholder="입력해주세요" label="신장" value={height} setValue={setHeight}/>
                        <NumInput placeholder="입력해주세요" label="체중" value={weight} setValue={setWeight}/>
                        <View style={style.saveBtn}>
                            <Button variant="SemiBold" fontColor = "#dcd4d4" fontSize={15} styles={{flex:1}} onPress={saveInfo} label="저장"/>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}


const style = StyleSheet.create({
    overlay:{
        flex:1,
        backgroundColor:"#131313",
        justifyContent:"center",
        alignItems:"center",
    },
    cardContainer:{
        alignItems:"center",
        width:"100%",
    },
    items:{
        gap:10,
        alignItems:"center",
        padding:30,
        paddingTop:"15%",
   
    },
    saveBtn:{
        justifyContent:"center",
        width:55,
        height:50,
        borderRadius:15,
        backgroundColor:"#131313",
        margin:10,
    },
    container:{
        backgroundColor:"rgb(34, 34, 34)",
        borderWidth:1,
        borderColor:"rgb(0, 0, 0)",
        width:"90%",
        minHeight:300,
        flexShrink:0,
        borderRadius:20,
    },
    scrollContents:{
        flexGrow: 1,
    },
    closeBtn:{
        position:"absolute",
        right:0,
        top:0,
        justifyContent:"center",
        width:"25%",
        height:"15%",
    },
   
    text:{
        color:"#f3f3f3c5",
    },
   
})