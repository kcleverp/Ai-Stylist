import * as Location from "expo-location"

export const getCurrentLocation = async () => {
    try{
        const { status } = await Location.requestForegroundPermissionsAsync();

        if ( status !== "granted"){
            throw new Error("위치 권한이 거부되었습니다. 설정에서 위치 권한을 허용해주세요.")
        }

        const location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Balanced,})

        const coords = {
            lat: location.coords.latitude,
            lon: location.coords.longitude
        };

        return coords


    }catch(error:any){
        throw new Error(error.message || "위치정보를 받아오지 못했어요")
    }

}