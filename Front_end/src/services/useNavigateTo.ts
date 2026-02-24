import { useRouter, usePathname } from "expo-router";

export const useNavigateTo = () =>{
    const router = useRouter();
    const pathname = usePathname()
    const navigateTo = (path: any, params?: Record<string, any>) => {
            if(pathname === path){
                return
            }
            if(params){
                router.push({pathname: path, params: params})
                return
            }
            router.push(path)
        }
    return {navigateTo}
}