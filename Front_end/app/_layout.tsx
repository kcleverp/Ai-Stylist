import { Stack } from "expo-router";
import {useFonts} from "expo-font"
import TabBar from "@/src/component/TabBar";
import { styles } from "@/src/styles/AppStyle";
import Button from "@/src/component/Button";
import { useNavigateTo } from "@/src/services/useNavigateTo";
import { WeatherProvider } from "@/src/context/WeatherContext";
import { InfoProvider } from "@/src/context/UserInfoContext";
import { UserIdProvider } from "@/src/context/UserIdContext";
import { ItemsProvider } from "@/src/context/SelectedItemsContext";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import FirstLaunchModal from "@/src/component/FirstLaunchModal";
import SelectedItemsBox from "@/src/component/SelectedItemsBox";
export default function RootLayout() {
  const {navigateTo} = useNavigateTo()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [fontsLoaded] = useFonts({
      "Pretendard-Bold": require("@/src/assets/fonts/Pretendard-Bold.otf"),
      "Pretendard-SemiBold": require("@/src/assets/fonts/Pretendard-SemiBold.otf"),
      "Pretendard-Medium": require("@/src/assets/fonts/Pretendard-Medium.otf"),
      "Pretendard-Regular": require("@/src/assets/fonts/Pretendard-Regular.otf"),
    })
    if (!fontsLoaded) {
      return null;
    }

  return (
    <UserIdProvider>
      <InfoProvider>
        <WeatherProvider>
          <ItemsProvider>
            <Stack
              screenOptions={{
                // 모든 화면 공통 헤더 스타일
                headerStyle: { backgroundColor: "#131313" },
                headerTintColor: "#fff",
                headerTitleStyle: { fontWeight: "bold" },
                // 왼쪽 위에 홈 버튼(로고) 배치
                headerLeft: () => (
                  <Button fontColor="#ffffffff" styles={styles.closeBtn} fontSize={25} label="⌂" onPress={() => navigateTo("/")}/>
                ),
                headerRight: () => (
                  <View>
                    <Button styles ={style.buttons} fontColor="#dcd4d4" fontSize={12} label="개인정보 이용안내" onPress={() => setIsModalOpen(true)}/>
                    <FirstLaunchModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
                  </View>
                )
              }}
            >
              {/* 개별 화면 설정 */}
              <Stack.Screen name="index" options={{title:"홈"}}/>
              <Stack.Screen name="InputBaseGenerater" options={{ title: "O.O.T.A" }} />
              <Stack.Screen name="MyCloset" options={{ title: "내 옷장" }} />
              <Stack.Screen name="UserInfo" options={{ title: "내 정보" }} />
              <Stack.Screen name="ClosetLibrary" options={{ title: "옷장 목록" }} />
            </Stack>
            <SelectedItemsBox/>
            <TabBar />
          </ItemsProvider>
        </WeatherProvider>
      </InfoProvider>
    </UserIdProvider>
  );
}


const style = StyleSheet.create({
    buttons:{
    width: 100,
    height: 30,
  },
})