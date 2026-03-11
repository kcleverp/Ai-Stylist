import {View} from "react-native"
import Button from "./Button"
import { styles } from "../styles/AppStyle"
import { useNavigateTo } from "../services/useNavigateTo"

export default function TabBar(){
    const {navigateTo} = useNavigateTo() 
    return(
        <View style={styles.tabBar}>
            <Button label="⌸ 옷장" fontColor = "#dcd4d4" fontSize={15} styles={styles.tabItem} onPress={() => navigateTo("/MyCloset")}/>
            <Button label="O.O.T.A" styles={styles.centerButton} fontSize={16} onPress={() => navigateTo("/InputBaseGenerater")}/>
            <Button label="⚙︎ 정보" fontColor = "#dcd4d4" fontSize={15} styles={styles.tabItem} onPress={() => navigateTo("/UserInfo")}/>
        </View>
    )
}