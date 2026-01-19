import { Info, ImgUrl,ForImage } from "../types/schema"

const serverUrl = process.env.EXPO_PUBLIC_SERVER_URL;

export const requestStyleRecommendation = async(data:Info) => {

    const response = await fetch(`${serverUrl}/create`, {
        "method":"POST",
        "headers":{
            "Content-Type":"application/json"
        },
        "body": JSON.stringify(data)
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