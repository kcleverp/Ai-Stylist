import React, {createContext, useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {v4 as uuidv4} from "uuid"
import { useState, useEffect } from "react";
import { getDeviceId } from "../services/api";
import { Alert } from "react-native";
const UserIdContext = createContext<any>(null)

export const UserIdProvider = ({children}: {children: React.ReactNode}) => {
    const [userId, setUserId] = useState<string>("")
    useEffect(() =>{
        const loadUserId = async() =>{
            const savedUserId = await AsyncStorage.getItem("userId");
            if(savedUserId) {
                setUserId(savedUserId)
            }else{
                console.log("최초사용자 아이디 발급")
                await updateUserId()
            }
        };
        loadUserId()
    }, [])

    const updateUserId = async() => {
        const deviceId = await getDeviceId() 
        if (deviceId){
            setUserId(deviceId)
            await AsyncStorage.setItem("userId", deviceId)  
        }else{
            Alert.alert("서비스 연결에 실패했어요", 
                "안정적인 옷장 관리에 연결설정이 필요합니다?",
                [
                    {
                        text:"연결 재시도",
                        onPress: () => updateUserId()
                    },
                    {
                        text:"연결 건너뛰기(공식 신분증보단 조금 불안정해요))",
                        onPress: async() => {
                            const tempId = `temp-${uuidv4()}`
                            setUserId(tempId)
                            await AsyncStorage.setItem("userId", tempId);
                            alert("임시 신분증을 설정했어요")
                            console.log("임시아이디 설정됨", tempId)
                        }
                    }
                ]
            )
        }
    }   
    return (
        <UserIdContext.Provider value={{userId, updateUserId}}>
            {children}
        </UserIdContext.Provider>
    )
}

export const useUserIdContext = () => useContext(UserIdContext)