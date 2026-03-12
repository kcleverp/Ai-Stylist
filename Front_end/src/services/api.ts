import { RecommendationRequest, ImgUrl,ForImage, ClosetItem, Closet} from "../types/schema"
import { Platform } from "react-native";
import * as Application from 'expo-application';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Item } from "../types/schema";
const serverUrl = process.env.EXPO_PUBLIC_SERVER_URL;

export const requestStyleRecommendation = async(data:RecommendationRequest, items:Item[]) => {

    const postData = {
        data : data,
        items: items
    }
    const response = await fetch(`${serverUrl}/create`, {
        "method":"POST",
        "headers":{
            "Content-Type":"application/json",
        },
        "body": JSON.stringify(postData)
    })

    if (!response.ok){
        const errorData = await response.json()
        throw new Error(errorData.error || "서버 내부 오류가 발생했습니다.");
    }
    
    const answer = await response.json()

    return answer 
}

export const requestImagen = async (forImage:ForImage, gender:string) => {
    try{
        const response = await fetch(`${serverUrl}/imagen`,{
            "method":"POST",
            "headers":{
                "Content-Type":"application/json"
            },
            "body": JSON.stringify({"for_image":forImage, "gender":gender})
        })
        if(!response.ok){
            return null
        }
        const answer = await response.json()
        const imgUrl = answer.imgUrl 
        return imgUrl
    }catch(error){

    }
}

export const requestDelete = async (imgUrl:ImgUrl | undefined) => {
    if (!imgUrl){
        return null
    }
    try {
        const response = await fetch(`${serverUrl}/cleanup`,{
            "method": "DELETE",
            "headers":{
                "Content-Type":"application/json"
            },
            "body": JSON.stringify({"imgUrl":imgUrl})
        })
        if (response.ok){
            return null;
        }
    }catch(error){
        console.error("[네트워크 에러] 서버에 접근할 수 없습니다.", error);
    }
}

export const uploadImage = async(imgList:ClosetItem[]) => {
    try {
        const uploadPromise = imgList.map(async(item) => {
            const formData = new FormData()
            const localUri = item.img
            const filename = localUri.split("/").pop();

            const match = /\.(\w+)$/.exec(filename || "");
            const type = match? `image/${match[1]}` : `image`;
            formData.append('file', {
                uri: localUri,
                name: filename,
                type: type,
            } as any)

            formData.append("upload_preset", "ai_stylist_image")
            formData.append("cloud_name", "du6backam")
            const response = await fetch("https://api.cloudinary.com/v1_1/du6backam/image/upload",
                {
                "method":"POST",
                "body":formData,
                }
            )
            if(!response.ok){
                console.log("Cloudinary 파싱 실패")
                return null
            }
            const data = await response.json()
            return data.secure_url
        });
        const finalResult = await Promise.all(uploadPromise)
        return finalResult
    }catch(e){
        console.log("Cloudinary 통신 실패", e)
    }
}
export const getDeviceId = async() => {
    if(Platform.OS === "android"){
        const androidId = await Application.getAndroidId()
        return androidId
    }else if(Platform.OS === "ios"){
        const iosId = await Application.getIosIdForVendorAsync();
        return iosId
    }
}

export const sendToAnalyze = async(imgList:ClosetItem[], userId:string, name:string) =>{
    const imgUris = await uploadImage(imgList)
    if(!imgUris){
        alert("옷장 생성 실패")
        return null
    }
    
    const packaged = {
        userId: userId,
        name: name,
        images: imgUris
    }
    try{
        const response = await fetch(`${serverUrl}/analyze`,{
            "method":"POST",
            "headers":{
                "Content-Type":"application/json"
            },
            "body":JSON.stringify(packaged)
        })
        if (!response.ok){
            alert("옷장정보를 생성하는데 실패했어요")
            return null
        }
        const analyzedData = await response.json()
        const closetId = analyzedData.closetId
        const closetName = analyzedData.name
        console.log("이미지 분석 완료, 분석 정보 수령", closetId)
        addNewCloset(closetId, closetName)
        alert("옷장 등록에 성공했어요")
    }catch(e){
        alert("옷장 생성 실패(서버 통신불가)")
        return null
    }
}

const addNewCloset = async (id:string, name:string) => {
    try{
        const stored = await AsyncStorage.getItem('closet_list');
        const list = stored ? JSON.parse(stored) : [];
        const newCloset = {
            closetId: id,
            closetName: name
        }
        const isExist = list.some((item:Closet) => item.closetId === id);
        if (!isExist) {
        const updatedList = [...list, newCloset];
        await AsyncStorage.setItem('closet_list', JSON.stringify(updatedList));
        }
    }catch(e){
        console.log("저장실패",e)
    }
};

export const loadClosetData = async (userId:string) => {
    try{
        const url = `${serverUrl}/requestClosetData?userId=${userId}`    
        const response = await fetch(url, {
            "method":"GET",
            "headers":{
                "Content-Type":"application/json"
            }
        }) 
        if(!response.ok){
            alert("옷장정보를 불러오는데 실패했어요")
            return null
        }
        const answer = await response.json()
        if(answer.status ==="error"){
            alert("옷장 목록 로드에 실패했어요")
            return null
        }
        return answer
    }catch(e){
        alert("서버와 통신에 실패했어요")
    }
}

export const editClosetData = async(closetId: string, name:string ) => {
    try{
        const data = {"closetId": closetId, "newName": name}
        const response = await fetch(`${serverUrl}/editClosetData`, {
            "method": "PATCH",
            "headers": {
                "Content-Type": "application/json"
            },
            "body":JSON.stringify(data)
        })
        if(!response.ok){
            alert("이름 수정에 실패했어요")
            return null
        }
        const answer = await response.json()
        return answer
    }catch(e){
        alert("서버와 통신에 실패했어요")
    }
}
export const loadItemData = async(userId:string, closetId:string) => {
    try{
        const url = `${serverUrl}/requestItemData`
        const response = await fetch(url,{
            "method": "GET",
            "headers":{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userId}`,
                "X-Closet-Id": closetId
            }
        })
        if(!response.ok){
            alert("옷장 아이템 로드에 실패했어요")
            return null
        }  
        const answer = await response.json()
        return answer
    }catch(e){
        alert("실패")
    }
}