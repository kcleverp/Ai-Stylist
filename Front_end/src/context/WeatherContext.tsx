import React, {createContext, useContext} from "react";
import { useWeather } from "../services/useWeather";
import { useEffect } from "react";
import { Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo"
const WeatherContext = createContext<any>(null)

export const WeatherProvider = ({children}: {children: React.ReactNode}) => {
    const weatherTools = useWeather()
    useEffect(() => {
        weatherTools.appinit()
        const unsubscribe = NetInfo.addEventListener(state => {
        if (!state.isConnected || !state.isInternetReachable){
            Alert.alert(
            "네트워크 연결 끊김",
            "인터넷 연결이 없어요 네트워크 설정을 확인해주세요",
            [{text:"확인", style:"cancel"}]
            );
        }
        })
        return () => unsubscribe()
    },[])
    return(
        <WeatherContext.Provider value={weatherTools}>
            {children}
        </WeatherContext.Provider>
    )
}

export const useWeatherContext = () => useContext(WeatherContext);