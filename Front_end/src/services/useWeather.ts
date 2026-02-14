
import { useState } from "react"
import { Weather } from "../types/schema"
import { getCurrentWeather } from "./weather"
import { Alert } from "react-native"
import * as Location from "expo-location"

export const useWeather = () => {
    const baseWeather = {
      description_weather: "clearSky",
      weatherIcon:"https://openweathermap.org/img/wn/01d@2x.png",
      temp: 10,
      feels_like: 8
    }
    const [isWeatherFail, setIsWeatherFail] = useState<boolean>(false)
    const [isWeatherLoading, setIsWeatherLoading] = useState<boolean>(false)
    const [userWeather, setWeather] = useState<Weather>(baseWeather)

    const getWeather = async () => {
            try{
                setIsWeatherLoading(true)
                setIsWeatherFail(false)
                const weather = await getCurrentWeather()
                setWeather(weather)
                setIsWeatherLoading(false)
            }
            catch(error){
            setIsWeatherFail(true)
            setIsWeatherLoading(false)
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
    const whenWheatherErrorModalClose = () => {
        const baseWeather = {
        description_weather: "clearSky",
        weatherIcon:"https://openweathermap.org/img/wn/01d@2x.png",
        temp: 10,
        feels_like: 8
        }
        setWeather(baseWeather)
        setIsWeatherLoading(false)
        setIsWeatherFail(false)
        alert("날씨 정보를 가져올 수 없어서 기본값으로 설정했어요.\n\n• 날씨: 맑음\n• 기온: 10°C\n• 체감: 8°C");
    }

    
    return {
        isWeatherFail,
        isWeatherLoading,
        userWeather,
        getWeather,
        appinit,
        whenWheatherErrorModalClose
    };
}