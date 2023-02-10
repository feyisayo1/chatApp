import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { ref } from "vue";

const user = ref(auth.currentUser)

onAuthStateChanged(auth, (_user) => {
    console.log("user state change.current User is ", _user);
    user.value = _user
})

console.log(user.displayName);

const getUser = () => {
    return {user}
}

export default getUser