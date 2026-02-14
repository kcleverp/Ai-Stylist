// app/index.tsx
import React from "react";
import { View } from "react-native";
import WeatherCard from "@/src/component/WeatherCard";
import { styles } from "@/src/styles/AppStyle";
export default function Index() {
  return (
    <View style={styles.container}>
      <WeatherCard/>
    </View>
  );
}
