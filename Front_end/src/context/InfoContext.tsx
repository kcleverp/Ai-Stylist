import React, {createContext, useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Setting } from "../types/schema";
import { useState, useEffect } from "react";
const UserInfoContext = createContext<any>(null);

export const InfoProvider = ({children}: {children: React.ReactNode}) => {
    const [userInfo,setUserInfo] = useState<Setting>({userStyle:"", gender:"", height:0, weight:0})
    useEffect(() => {
        const loadUser = async () => {
        const saved = await AsyncStorage.getItem("userInfo");
        if (saved) setUserInfo(JSON.parse(saved));
        };
        loadUser();
    }, []);

    const updateUserInfo = async(newInfo:Setting) => {
        const bmi = Number((newInfo.weight / ((newInfo.height / 100) ** 2)).toFixed(1));
        const finalInfo = {...newInfo, bmi}

        setUserInfo(finalInfo)
        await AsyncStorage.setItem("userInfo", JSON.stringify(finalInfo))
    };
    return (
        <UserInfoContext.Provider value={{ userInfo, updateUserInfo }}>
            {children}
        </UserInfoContext.Provider>
    );
}
export const useUserInfoContext = () => useContext(UserInfoContext);