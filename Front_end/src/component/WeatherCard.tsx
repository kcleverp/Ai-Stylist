import AppText from "@/src/component/AppText";
import { View, ActivityIndicator, Image} from "react-native";
import { useWeatherContext } from "../context/WeatherContext";
import WeatherErrorModal from "@/src/component/WeatherErrorModal";
import { styles } from "../styles/AppStyle";
import Button from "@/src/component/Button";


export default function WeatherCard() {
    const {getWeather, whenWheatherErrorModalClose, isWeatherLoading, userWeather, isWeatherFail} = useWeatherContext();
    const {temp = null, weatherIcon = undefined, feels_like = null} = userWeather || {}
    return(
        <View style={styles.weatherContainer}>
            <AppText style={{color:"#dcd4d4", fontSize:16, letterSpacing: 1.5}}>현재 날씨정보</AppText>
            {!isWeatherLoading &&(
            <Button onPress={() => getWeather()} styles={styles.weatherRefreshButton} variant="Bold" fontColor="#dcd4d4" fontSize={25} label="⟳"/>)}
            {isWeatherLoading && (
            <>
            <ActivityIndicator size="large"/>
            <AppText style={{color:"#dcd4d4", fontSize:14, letterSpacing: 1.5}}>날씨 로딩중입니다.{"\n"}최초 실행 시 최대 1분 정도 소요될 수 있습니다.</AppText>
            </>)}
            {!isWeatherLoading && (
            <View style={styles.weatherTextContainer}>
                <Image style={styles.icon} source={{uri: weatherIcon}}/>
                <AppText variant="SemiBold" style={styles.weatherText}>{temp}℃ | 체감: {feels_like}℃</AppText>
            </View>)}
            <WeatherErrorModal visible={isWeatherFail} onClose={whenWheatherErrorModalClose} retry={() => getWeather()}/>
        </View>
    )
}