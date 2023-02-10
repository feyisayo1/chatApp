import { auth } from "@/firebase/config"
import { ref } from "vue"

const error = ref(null)

const logout = async () => {
    error.value = null
    try{
        await auth.signOut()
    }catch(err){
        console.log(err.message);
        error.value = error.message
    }
}

const useLogout = () => {
    return {logout, error}
}

export default useLogout