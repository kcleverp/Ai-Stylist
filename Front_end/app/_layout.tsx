import { Stack } from "expo-router";
import {useFonts} from "expo-font"
import TabBar from "@/src/component/TabBar";
import { styles } from "@/src/styles/AppStyle";
import Button from "@/src/component/Button";
import { useNavigateTo } from "@/src/services/useNavigateTo";
import { WeatherProvider } from "@/src/context/WeatherContext";
import { InfoProvider } from "@/src/context/UserInfoContext";
import { UserIdProvider } from "@/src/context/UserIdContext";
export default function RootLayout() {
  const {navigateTo} = useNavigateTo()
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
          <Stack
            screenOptions={{
              // 모든 화면 공통 헤더 스타일
              headerStyle: { backgroundColor: "#131313" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
              // 왼쪽 위에 홈 버튼(로고) 배치
              headerLeft: () => (
                <Button fontColor="#ffffffff" styles={styles.closeBtn} fontSize={25} label="<" onPress={() => navigateTo("/")}/>
              ),
            }}
          >
            {/* 개별 화면 설정 */}
            <Stack.Screen name="index" options={{title:"홈"}}/>
            <Stack.Screen name="InputBaseGenerater" options={{ title: "오늘 코디" }} />
            <Stack.Screen name="myCloset" options={{ title: "내 옷장" }} />
            <Stack.Screen name="UserInfo" options={{ title: "내 정보" }} />
          </Stack>
          <TabBar />
        </WeatherProvider>
      </InfoProvider>
    </UserIdProvider>
  );
}

