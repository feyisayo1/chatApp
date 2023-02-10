import { db } from "@/firebase/config"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { ref, watchEffect } from "vue"
import getUser from '../composables/getUser'


const getCollection = (coll) => {
    const documents = ref(null)
    const error = ref(null)
    const {user} = getUser()
    // console.log(user.value.email)

    let collectionRef = collection(db, coll)
    let q = query(collectionRef, orderBy('createdAt'))

    // listening realtime
    const unsub = onSnapshot(q, (snap) => {
        console.log('snapshot')
        let results = []
        snap.docs.forEach((doc) => {
            var messageData = doc.data() 
            // console.log(messageData);
            var isSender = messageData.name === user.value.displayName
            doc.data().createdAt && results.push({...doc.data(), id:doc.id, isSender:isSender})
            // console.log(results)
            // if(!doc.message){
                
            // }
        })
        // console.log(results)
        documents.value = results
        error.value = null
    }, (err) => {
       console.log(err.message) 
       documents.value = null
       error.value = 'could not fecth data'
    })

    // collectionRef.onSnapshot()
    //unsub from prev collection when watcher is stopped (component unmounted)
    watchEffect((onInvalidate) => {
        onInvalidate(() => {
            unsub()
        })
    })
    return {documents, error}
}


export default getCollection