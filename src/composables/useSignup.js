import { auth } from "@/firebase/config"
import { createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import { ref } from "vue"

const error = ref(null)

const signup = async (email, password, displayName) => {
    error.value = null

    try {  
        const res = await createUserWithEmailAndPassword(auth, email, password, displayName)
        if(!res){
            throw new Error('Could not complete the signup')
        }
        updateProfile(auth.currentUser, {displayName:displayName})
        .then(() => {
            console.log('profile updated');
        })
        console.log(res.user);
    } catch (err) {
        console.log(err.message);
        error.value = err.message
    }
}



// await res.user.updateProfile({displayName})

const useSignup = () => {
    return { error, signup}
}


export default useSignup