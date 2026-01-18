import { ImageSourcePropType } from "react-native"
export type FontVariants = "Bold" | "SemiBold" | "Medium" | "Regular"

export interface Setting{
  userStyle:string
  gender:string
  height:number
  weight:number
}

export interface Weather{
  description_weather: string,
  temp: number,
  feels_like: number
}

export interface Info{
    userInput: string
    userInfo: Setting
    userWeather: Weather
}

export type ImgUrl = string | ImageSourcePropType

/** 코디 추천 상세 구조 */


export interface Recommendation {
    cap:string
    outerwear:string
    top:string
    bottom:string
    shoes:string
    acc:string
}

export interface Style{
  style_label: string,  
  style_analysis: string;
  hashtags: string[];
  for_answer:Recommendation;
}


export interface emoji {
  "weatherConditionEmoji" : string
}

/** 서버 전체 응답 구조 (통합 State용) */
export interface Contents{
  "status": string,
  "timestamp": string,
  "data": {
      "weather":{
          "temp":number, 
          "condition":string,
          "emoji":emoji
      },
      "recommendation":{
          "style":Style[], 
          "imgUrl":ImgUrl
      },  
  },
}