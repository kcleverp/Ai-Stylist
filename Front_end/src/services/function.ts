import AsyncStorage from "@react-native-async-storage/async-storage"

type props = (para:boolean) => void

export const checkFirstLaunch = async(todo:props) => {
    try{
        const hasLaunched = await AsyncStorage.getItem("HAS_LAUNCHED");
        console.log(hasLaunched)

        if(hasLaunched === null){
            await AsyncStorage.setItem("HAS_LAUNCHED", "true");
            todo(true)
        }else{
            todo(false)
        }
    }catch(error){
        console.error("첫 실행 확인 중 오류", error);
    }
}