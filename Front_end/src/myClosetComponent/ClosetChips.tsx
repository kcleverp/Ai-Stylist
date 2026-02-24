import { ScrollView, StyleSheet } from "react-native"
import Button from "../component/Button"
import { useNavigateTo } from "../services/useNavigateTo"

export default function ClosetChips({data}:any){
    const { navigateTo } = useNavigateTo()
    return(
        <ScrollView showsVerticalScrollIndicator={false} style={style.chipContainer} >
            {data && data.map((item:any) => (
                <Button
                key={item.id}
                label={item.name}
                styles={style.chip}
                onPress={() => navigateTo("/ClosetItems", {id: item.id})}
                />
            ))}
        </ScrollView>
    )
}

const style = StyleSheet.create({
    chip:{

    },
    chipContainer:{

    }
})