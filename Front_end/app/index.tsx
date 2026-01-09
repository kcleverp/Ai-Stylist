
import FooterPanel from "@/src/component/FooterPanel";
import ResultModal from "@/src/component/ResultModal";
import { useEffect, useState } from "react";
import { ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import {requestStyleRecommendation} from "@/src/services/api"
import { getCurrentLocation } from "@/src/services/location"; 
import {useFonts} from "expo-font"
import AppText from "@/src/component/AppText";

interface Recommendation {
    cap:string
    top:string
    bottom:string
    shoes:string
    acc:string
}

interface setting{
  userStyle:string
  gender:string
  height:number
  weight:number
}

interface coords{
  lat:number,
  lon:number,
}


export default function Index() {

  //전역 폰트 설정
  const [fontsLoaded] = useFonts({
    "Pretendard-Bold": require("@/src/assets/fonts/Pretendard-Bold.otf"),
    "Pretendard-SemiBold": require("@/src/assets/fonts/Pretendard-SemiBold.otf"),
    "Pretendard-Medium": require("@/src/assets/fonts/Pretendard-Medium.otf"),
    "Pretendard-Regular": require("@/src/assets/fonts/Pretendard-Regular.otf"),
  })
  

  // state 영역
  const [userCoords, setUserCoords] = useState<coords| null>(null)
  const [userInfo,setUserInfo] = useState<setting>({userStyle:"", gender:"", height:0, weight:0})
  const [userInput, setUserInput] = useState<string>("")
  const [aiResponse,setResponse] = useState<Recommendation | null>(null)
  const [styleList,setStyleList] = useState<Recommendation[]>([])  
  const [imgUrl,setImgUrl] = useState<string | ImageSourcePropType | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  //앱 시작시 위치정보 로딩
  useEffect(() => {
    const getlocation = async () => {
    try{
        const coords = await getCurrentLocation()
        setUserCoords(coords)
      }
    catch(error){
      console.warn("위치정보를 가져오지 못함",error)
    }
  }
  getlocation()
},[])

if (!fontsLoaded || !userCoords) {
    return null; 
  }

  //함수 영역
  const getInfo = (infoList:setting) => {
    setUserInfo(infoList)
  }

  const getInput = (input:string) =>{
    setUserInput(input)
  }

  const onClose = () =>{
    setIsModalVisible(false)
    setImgUrl(undefined)
    setResponse(null)
  }
  const serverUrl = process.env.EXPO_PUBLIC_SERVER_URL;

  const sendInfo = async () => {

    if(!userCoords){
      alert("위치정보를 불러오고 있어요. 잠시만 기다려주세요")
      return null
    }

    setIsLoading(true)
    setIsModalVisible(true)

    const info = {"userInput":userInput,"userInfo":userInfo, "userCoords":userCoords}

    try{
        const data = await requestStyleRecommendation(info)
        setResponse(data.answer)
        setStyleList([data.answer, ...styleList])
        setImgUrl(`${serverUrl}${data.imgUrl}?t=${new Date().getTime()}`)
        
    }catch(error){
        console.error("서버통신 불가",error)
        alert("서버 통신중 오류가 발생했습니다.")
        setIsLoading(false)
        setIsModalVisible(false)
    }
  }

      
  return (
    <View style={style.container}>
      <AppText style={style.text} variant="SemiBold">오늘은 어디로 가나요?</AppText>
      <FooterPanel getInfo={getInfo} input = {userInput} getInput={getInput} sendInfo = {sendInfo}/>
      <ResultModal isLoading ={isLoading} WhenLoadingDone={() =>setIsLoading(false)} imgUrl={imgUrl} data= {aiResponse} isVisible={isModalVisible} onClose={onClose}/>
    </View>
  );
}

const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#121212",
    alignItems:"center",
    justifyContent:"center"
    
  },
  text:{
    color:"white",
    fontSize:24,
    margin:50,
    position:"absolute",
    top:"30%",
  },
 
})