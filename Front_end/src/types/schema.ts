import { ImageSourcePropType } from "react-native"
import { JSX } from "react"
export type FontVariants = "Bold" | "SemiBold" | "Medium" | "Regular"

export interface Setting{
  userStyle:string
  gender:string
  height:number
  weight:number
  bmi:number
}
export interface Item{
    id:string,
    for_front:string
}
export interface Data{
    map(arg0: (item: any) => JSX.Element): import("react").ReactNode
    id:string,
    category:string,
    style_tags:string[],
    for_front:string,
    item_coord:number[],
    image_url:string,
}
export interface RecommendationRequest{
  userId:string,
  userInput:string,
  userInfo:Setting,
  userWeather:Weather
}

export interface Weather{
  description_weather: string,
  weatherIcon: string,
  temp: number,
  feels_like: number
}

export type ImgUrl = string | ImageSourcePropType

/** 코디 추천 상세 구조 */


export interface Recommendation {
    top:string
    outerwear:string
    neck_acc:string
    bottom:string
    shoes:string
}
export interface Closet{
  closetId:string,
  closetName:string
}
export interface Style{
  style_label: string,  
  style_analysis: string;
  hashtags: string[];
  for_answer:Recommendation;
}
export interface Outfit{
  style_label: string,
  top: string,
  outerwear: string,
  neck_acc: string
  bottom: string,
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
          "style":Style, 
          "for_image":ForImage,
          "imgUrl":ImgUrl
      },  
  },
}

//나만의 옷장

export interface ClosetItem{
  id:string,
  img:string
  assetId: string| null | undefined
}
export interface imgList{
    imgList:ClosetItem[]
    setImgList:(item:ClosetItem[]) => void
}