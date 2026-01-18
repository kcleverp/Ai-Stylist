import * as Location from "expo-location"
const serverUrl = process.env.EXPO_PUBLIC_SERVER_URL;

export const getCurrentWeather = async () => {
    try{
        const { status } = await Location.requestForegroundPermissionsAsync();

        if ( status !== "granted"){
            throw new Error("위치 권한이 거부되었습니다. 설정에서 위치 권한을 허용해주세요.")
        }

        const location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Balanced,})

        const coords = {
            "lat": location.coords.latitude,
            "lon": location.coords.longitude
        };
        try {
            const response = await fetch(`${serverUrl}/weather`,{
                "method":"POST",
                "headers":{
                    "Content-Type":"application/json"
                },
                "body":JSON.stringify(coords)
            })
            if (!response.ok){
                throw new Error("날씨정보를 받아오지 못했어요")
            }
            const weather = await response.json()
            return weather

        
        }catch(error:any){
            throw new Error(error.message || "날씨api 통신이 원활하지 못해요")
        }


    }catch(error:any){
        throw new Error(error.message || "위치정보를 받아오지 못했어요")
    }

}