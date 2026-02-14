import { useRouter, usePathname } from "expo-router";

export const useNavigateTo = () =>{
    const router = useRouter();
    const pathname = usePathname()
    const navigateTo = (path: any) => {
            if(pathname === path){
                return
            }
            router.replace(path)
        }
    return {navigateTo}
}