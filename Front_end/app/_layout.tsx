import { Stack } from "expo-router";
import { Modal } from "react-native";

export default function RootLayout() {
  return(
    <Stack>
      <Stack.Screen name="index" options ={{headerShown:false}} />
      <Stack.Screen name="myCloset" options = {{presentation:"modal"}}/>
    </Stack>
  ) 
}