import { ref } from "vue"
import { db } from "@/firebase/config"
import { addDoc, collection, doc, setDoc } from "firebase/firestore"

const useCollection = (coll) => {
    const error = ref(null)
    // const colRef = collection(db)

    const addDocument = async (doc) => {
        error.value = null

        // using docRef and using it for just this composable.
        // try{
        // //    await addDoc(colRef, doc)
        // const docRef = doc(collection (db, 'messages'))
        // await setDoc(docRef, chat)
        // console.log(docRef)
        // }catch(err){
        //     console.log(err.message);
        //     error.value = 'could not send the message'
        // }
        
        try {
            await addDoc(collection(db, coll) ,doc)
        } catch (err) {
            console.log(err.message)
            error.value = 'could not send the message'
        }
    }
    return { error, addDocument}
}


export default useCollection