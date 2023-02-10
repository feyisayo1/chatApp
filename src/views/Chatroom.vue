<template>
  <div class="container">
    <Navbar/>
    <ChatWindow/>
    <NewChatForm/>
  </div>
</template>



<script>
// challenge
// get the current user using the getUser composable
// watch the current user for the changes 
// redirect the user to the welcomd page when they are logged out


import { onAuthStateChanged } from '@firebase/auth';
import { ref } from '@vue/reactivity';
import Navbar from '../components/Navbar.vue';
import getUser from '../composables/getUser'
import { useRouter } from 'vue-router';
import { auth } from '@/firebase/config';
import { watch } from '@vue/runtime-core';
import NewChatForm from '@/components/NewChatForm.vue';
import ChatWindow from '@/components/ChatWindow.vue';
export default {
components: { Navbar, NewChatForm, ChatWindow },

  setup(){
    const router = useRouter()
    const { user } = getUser()
    
    //redirecting the user to the welcome page if the user logouts using onAuthStateChanged
    
    // const currUser = ref(auth.currentUser)
    // currUser.value = user
    // onAuthStateChanged(auth, (user) => {
    //   if(!user){
    //     router.push({name:'Welcome'})
    //   }
    // })

    //another method for loggin out using watch
    watch(user, () => {
      if(!user.value){
        router.push({name:'Welcome'})
      }
    })
  }

  
}
</script>

<style>

</style>