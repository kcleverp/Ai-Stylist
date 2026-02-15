import FooterPanel from "@/src/component/FooterPanel";
import ResultModal from "@/src/component/ResultModal";
import AppText from "@/src/component/AppText";
import { Contents, RecommendationRequest } from "@/src/types/schema";
import { useState } from "react";
import { Alert, StyleSheet, View} from "react-native";
import {requestStyleRecommendation, requestDelete} from "@/src/services/api"
import Button from "@/src/component/Button";
import FirstLaunchModal from "@/src/component/FirstLaunchModal";
import { useWeatherContext } from "@/src/context/WeatherContext";
import { useUserInfoContext } from "@/src/context/UserInfoContext";
import WeatherCard from "@/src/component/WeatherCard";
import { useUserIdContext } from "@/src/context/UserIdContext";
export default function InputBaseGenerater() {
  // state 영역

  const {userInfo} = useUserInfoContext()
  const {userWeather} = useWeatherContext()
  const {userId} = useUserIdContext()
  const [userInput, setUserInput] = useState<string>("")
  const [contents, setContents] = useState<Contents| null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  //함수 영역
  
  //앱 시작시 날씨정보 로딩

  const getInput = (input:string) =>{
    setUserInput(input)
  }

  const onClose = () =>{
    setIsModalVisible(false)
    setContents(null)
  }

  const sendInfo = async () => {
    setIsLoading(true)
    setIsModalVisible(true)
    const info:RecommendationRequest = {"userId": userId, "userInput":userInput, "userInfo":userInfo, "userWeather":userWeather}
    const attemptFetch = async(retriesLeft:number) => {
        try{
          const data = await requestStyleRecommendation(info)
          if (data.status === "failed"){
            if(retriesLeft > 0){
              console.log(`생성 실패, 재시도 남은 횟수:${retriesLeft}`)
              await new Promise(resolve => setTimeout(resolve, 1000))
              return attemptFetch(retriesLeft - 1);
            }else{
              alert("현재 서버 부하가 커서 코디를 생성할 수 없습니다. 잠시 후 다시 시도해주세요.");
              setIsLoading(false);
              setIsModalVisible(false);
              return null
            }
          }
          setContents(data)
        }catch(error){
          console.error("서버통신 불가",error)
          Alert.alert(
            "연결 오류",
            "서버 응답이 지연되고 있습니다.\n잠시 후 다시 시도해 주세요.",
          [ {text:"확인", style:"cancel", 
            onPress:() => {
              setIsLoading(false)
              setIsModalVisible(false)}},
            {text:"다시시도", 
              onPress:() => {
                setIsLoading(false)
                setIsModalVisible(false)
                sendInfo()
              }}
          ])
      }
    }
    await attemptFetch(2)
  }

  const whenLoadingDone = () => {
    setIsLoading(false)
    if(contents?.data?.recommendation?.imgUrl){
      requestDelete(contents?.data.recommendation.imgUrl)}
  }


  return (
    <View style={style.container}>
      <WeatherCard/>
      <FirstLaunchModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
      <AppText style={style.text} variant="Bold">오늘은 어떤 스타일이 좋을까요?</AppText>
      <FooterPanel input={userInput} getInput={getInput} userWeather={userWeather} userId={userId} sendInfo = {sendInfo}/>
      <Button styles ={style.buttons}fontColor="#dcd4d4" label="개인정보 이용 안내" onPress={() => setIsModalOpen(true)}/>
      <ResultModal isLoading={isLoading} gender={userInfo.gender} WhenLoadingDone={whenLoadingDone} data = {contents} isVisible={isModalVisible} onClose={onClose}/>
    </View>
  );
}

const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#131313",
    justifyContent:"center",
    alignItems:"center",
  },
  noInputText:{
    color:"#dcd4d4",
    fontSize:12,
    letterSpacing: 1.5,
  },
  buttons:{
    backgroundColor:"#333232c1",
    borderWidth:1,
    borderColor: '#434242ac',      
    borderTopColor: '#555',
    borderRadius:10,
    width: 150,
    height: 50,
    position:"absolute",
    bottom:100,
  },
  
  text:{
    color:"#dcd4d4",
    fontSize:20,
    letterSpacing: 1.5,
    margin:20,
  },
 
})