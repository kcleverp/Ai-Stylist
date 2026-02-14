import {View} from "react-native"
import Button from "./Button"
import { styles } from "../styles/AppStyle"
import { usePathname, useRouter } from "expo-router"



export default function TabBar(){
    const router = useRouter();
    const pathname = usePathname()
    const navigateTo = (path: any) => {
        if(pathname === path){
            return
        }
        router.replace(path)
    }
    return(
        <View style={styles.tabBar}>
            <Button label="내 옷장" fontColor = "#dcd4d4" styles={styles.tabItem} onPress={() => navigateTo("/myCloset")}/>
            <Button label="오늘코디" styles={styles.centerButton} onPress={() => navigateTo("/InputBaseGenerater")}/>
            <Button label="내 정보" fontColor = "#dcd4d4" styles={styles.tabItem} onPress={() => navigateTo("/UserInfo")}/>
        </View>
    )
}