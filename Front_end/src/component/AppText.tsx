/**
 * Pretendard 폰트가 적용된 공통 텍스트 컴포넌트입니다.
 * variant 속성을 통해 Bold, SemiBold 등을 간편하게 설정할 수 있습니다.
*/


import {Text, TextProps} from "react-native"
import {ReactNode} from "react"

type FontVariant = "Bold" | "SemiBold" | "Medium" | "Regular"

interface AppTextProps extends TextProps{
    children:ReactNode
    variant?:FontVariant
}

export default function AppText({children, variant="Regular", style,...props}:AppTextProps){
    const selectedFont = {
        "Bold":"Pretendard-Bold",
        "SemiBold":"Pretendard-SemiBold",
        "Medium":"Pretendard-Medium",
        "Regular":"Pretendard-Regular",
    }[variant]

    return(
            <Text style={[{fontFamily:selectedFont}, style]}>{children}</Text>
    )
}



