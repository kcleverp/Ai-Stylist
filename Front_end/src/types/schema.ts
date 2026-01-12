import { ImageSourcePropType } from "react-native"
export type FontVariants = "Bold" | "SemiBold" | "Medium" | "Regular"

export interface Setting{
  userStyle:string
  gender:string
  height:number
  weight:number
}

export interface Coords{
  lat:number,
  lon:number,
}

/** 코디 추천 상세 구조 */
export interface Recommendation {
    cap:string
    top:string
    bottom:string
    shoes:string
    acc:string
}

export interface emoji {
  "weatherConditionEmoji" : string
  "tempEmoji" : string
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
          "answer":Recommendation, 
          "imgUrl":string | ImageSourcePropType,
          "analysis": string,
          "hashtags": string[]
      },  
  },
}