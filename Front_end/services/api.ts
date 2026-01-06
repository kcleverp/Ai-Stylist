
interface setting{
  userStyle: string
  gender: string
  height: number
  weight: number
}

interface coords{
    lat:number
    lon:number
}
type Info = {
    userInput: string
    userInfo: setting
    userCoords:coords
}

const serverUrl = process.env.EXPO_PUBLIC_SERVER_URL;
console.log(serverUrl)
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