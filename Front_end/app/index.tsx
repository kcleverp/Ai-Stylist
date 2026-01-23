import FooterPanel from "@/src/component/FooterPanel";
import ResultModal from "@/src/component/ResultModal";
import AppText from "@/src/component/AppText";
import { Setting, Weather, Contents } from "@/src/types/schema";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, View, ActivityIndicator, Image } from "react-native";
import {requestStyleRecommendation, requestDelete} from "@/src/services/api"
import { getCurrentWeather } from "@/src/services/weather"; 
import {useFonts} from "expo-font"
import WeatherErrorModal from "@/src/component/WeatherErrorModal";
import * as Location from "expo-location"
import Button from "@/src/component/Button";
import FirstLaunchModal from "@/src/component/FirstLaunchModal";
export default function Index() {

  //전역 폰트 설정
  const [fontsLoaded] = useFonts({
    "Pretendard-Bold": require("@/src/assets/fonts/Pretendard-Bold.otf"),
    "Pretendard-SemiBold": require("@/src/assets/fonts/Pretendard-SemiBold.otf"),
    "Pretendard-Medium": require("@/src/assets/fonts/Pretendard-Medium.otf"),
    "Pretendard-Regular": require("@/src/assets/fonts/Pretendard-Regular.otf"),
  })
  
  // state 영역
  const [userWeather, setWeather] = useState<Weather| null>(null)
  const [userInfo,setUserInfo] = useState<Setting>({userStyle:"", gender:"", height:0, weight:0})
  const [userInput, setUserInput] = useState<string>("")

  const [contents, setContents] = useState<Contents| null>(null)

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const [isWeatherFail, setIsWeatherFail] = useState<boolean>(false)
  const [isWeatherLoading, setIsWeatherLoading] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  //함수 영역

  const getWeather = async () => {
    try{
        setIsWeatherLoading(true)
        setIsWeatherFail(false)
        const weather = await getCurrentWeather()
        setWeather(weather)
        setIsWeatherLoading(false)
        console.log("날씨 정보를 가져왔어요")
        console.log(weather)
      }
    catch(error){
      setIsWeatherFail(true)
      console.warn("날씨정보를 가져오지 못함",error)
    }
  }

  const appinit = async() => {
    const { status: existingStatus } = await Location.getForegroundPermissionsAsync();
    if (existingStatus ==="granted"){
      getWeather()

    }else if(existingStatus === "undetermined"){
      Alert.alert(
        "위치권한 안내",
        "현재 위치의 날씨와 기온 기반 코디 생성을 위해 위치 권한이 필요해요",
        [
          {
            text:"거부",
            onPress: () => Alert.alert("안내","위치 권한이 거부되어 기본값으로 설정했어요.\n\n• 날씨: 맑음\n• 기온: 10°C\n• 체감: 8°C"),
            style:"cancel"
          },
          {
            text:"확인",
            onPress: async () => {
              const { status:newStatus } = await Location.requestForegroundPermissionsAsync();
              if (newStatus === "granted"){
                getWeather()
              }else{
                Alert.alert("안내","위치 권한이 거부되었습니다. 설정에서 위치 권한을 허용해주세요.")
              }
            }
          }
        ]
      )
    }else if (existingStatus == "denied"){
      console.log("위치 권한 거부됨")
    }
  }

  //앱 시작시 날씨정보 로딩
  useEffect(() => {
    console.log("날씨정보를 받아올게요")
    const baseWeather = {
      description_weather: "clearSky",
      weatherIcon:"https://openweathermap.org/img/wn/01d@2x.png",
      temp: 10,
      feels_like: 8
    }
    setWeather(baseWeather)
    appinit()
    const cleanInfo = {
        "userStyle": "casual", 
        "gender": "male",
        "height": 170 ,
        "weight": 60 
      }
    setUserInfo(cleanInfo)
  },[])

  if (!fontsLoaded) {
    return null;
  }

  const getInfo = (infoList:Setting) => {
    const userStyle = infoList.userStyle
    const userGender = infoList.gender
    const userHeight = infoList.height 
    const userWeight = infoList.weight 
    const cleanInfo = {
        "userStyle": userStyle || "casual", 
        "gender": userGender || "male",
        "height":  typeof userHeight === "number" &&(userHeight < 200 && userHeight >= 100 ) ? userHeight : 170 ,
        "weight": typeof userWeight === "number" && (userWeight < 200 && userWeight >= 25 ) ? userWeight : 60
      }
    setUserInfo(cleanInfo)
  }

  const getInput = (input:string) =>{
    setUserInput(input)
  }

  const onClose = () =>{
    setIsModalVisible(false)
    setContents(null)
  }

  const sendInfo = async () => {
    if(!userWeather){
      alert("날시정보를 불러오고 있어요. 잠시만 기다려주세요")
      return null
    }
    setIsLoading(true)
    setIsModalVisible(true)
    const info = {"userInput":userInput,"userInfo":userInfo, "userWeather":userWeather}
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
          alert("서버 통신중 오류가 발생했습니다.")
          setIsLoading(false)
          setIsModalVisible(false)
          return null
      }
    }
    await attemptFetch(2)
  }

  const whenLoadingDone = () => {
    setIsLoading(false)
    requestDelete(contents?.data.recommendation.imgUrl)
  }

  const whenWheatherErrorModalClose = () => {
    const baseWeather = {
      description_weather: "clearSky",
      weatherIcon:"https://openweathermap.org/img/wn/01d@2x.png",
      temp: 10,
      feels_like: 8
    }
    setWeather(baseWeather)
    setIsWeatherFail(false)
    alert("날씨 정보를 가져올 수 없어서 기본값으로 설정했어요.\n\n• 날씨: 맑음\n• 기온: 10°C\n• 체감: 8°C");
  }

  const retry = () => {
    console.log("날씨 정보를 다시 가져올게요")
    getWeather()
  }
  const {temp = null, weatherIcon = undefined, feels_like = null} = userWeather || {}
  return (
    <View style={style.container}>
      <FirstLaunchModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
      <WeatherErrorModal visible={isWeatherFail} onClose={whenWheatherErrorModalClose} retry={retry}/>
      <View style={style.weatherContainer}>
        <AppText style={{color:"#dcd4d4", fontSize:16, letterSpacing: 1.5}}>현재 날씨정보</AppText>
        <Button onPress={retry}styles={style.button} variant="Bold" fontColor="#dcd4d4" fontSize={25} label="⟳"/>
        {isWeatherLoading && (
          <ActivityIndicator size="large"/>)}
        {!isWeatherLoading && (
          <View style={style.weatherTextContainer}>
            <Image style={style.icon} source={{uri: weatherIcon}}/>
            <AppText variant="SemiBold" style={style.weatherText}>{temp}℃ | 체감: {feels_like}℃</AppText>
          </View>)}
      </View>
      <AppText style={style.text} variant="Bold">오늘은 어떤 스타일이 좋을까요?</AppText>
      <FooterPanel getInfo={getInfo} input = {userInput} getInput={getInput} sendInfo = {sendInfo}/>
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
  buttons:{
    backgroundColor:"#333232c1",
    borderWidth:1,
    borderColor: '#434242ac',      
    borderTopColor: '#555',
    borderRadius:10,
    width: 180,
    height: 50,
    position:"absolute",
    bottom:120,
  },
  icon:{
    width:45,
    height:30,
    resizeMode: 'contain'
  },
  weatherContainer:{
    height:100,
    width:300,
    backgroundColor:"#22212176",
    alignItems:"center",
    borderRadius:30,
    borderWidth: 1,
    borderColor: 'rgba(159, 155, 155, 0.18)',
    gap:20,
    position:"absolute",
    padding:10,
    top:100,
  },
  weatherTextContainer:{
    flexDirection:"row",
  },
  text:{
    color:"#dcd4d4",
    fontSize:20,
    letterSpacing: 1.5,
    margin:20,
  },
  weatherText:{
    color:"#dcd4d4",
    fontSize:18,
    letterSpacing: 1.5
  },
  button:{
    width:50,
    height:35,
    position:"absolute",
    right:5,
  }
 
})