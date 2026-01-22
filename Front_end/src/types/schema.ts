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
  weatherIcon: string,
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
    top:string
    outerwear:string
    neck_acc:string
    bottom:string
    hand_acc:string
    shoes:string
}

export interface Style{
  style_label: string,  
  style_analysis: string;
  hashtags: string[];
  for_answer:Recommendation;
}
export interface Outfit{
  style_label: string,
  cap: string,
  top: string,
  outerwear: string,
  neck_acc: string
  bottom: string,
  hand_acc: string
  shoes: string,

}
export interface ForImage{
  character:string,
  background:string,
  outfits:Outfit[]
}

/** 서버 전체 응답 구조 (통합 State용) */
export interface Contents{
  "status": string,
  "timestamp": string,
  "data": {
      "recommendation":{
          "style":Style[], 
          "for_image":ForImage,
          "imgUrl":ImgUrl
      },  
  },
}