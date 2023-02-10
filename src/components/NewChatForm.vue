<template>
  <form @keypress.enter.prevent="handleSubmit">
    <div class="submit">
        <textarea
        placeholder="type a message and hit enter to send"
        v-model = "message"
    ></textarea>
    <button type="submit" @click.prevent="handleSubmit">Enter</button>
    </div>
    <div class="error">{{ error }}</div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import getUser from '../composables/getUser'
import useCollection from '../composables/useCollection'
import { timestamp } from '../firebase/config'
    export default {
    setup() {
        const {user} = getUser()
        const { addDocument, error } = useCollection('messages')
        const message = ref('')

        const handleSubmit = async () => {
            if(message.value.length > 0){
                const chat = {
                name: user.value.displayName,
                message: message.value,
                createdAt: timestamp()
            }
            // console.log(chat);
            await addDocument(chat)
            if(!error.value){
                message.value= ''
            }
            }else{
                console.log('empty chat')
            }

        }
        return{message, handleSubmit, error}
    }
}
</script>

<style scoped>
    form{
        margin: 10px;
    }
    textarea{
        width:100%;
        max-width:100%;
        margin-bottom: 6px;
        padding: 10px;
        box-sizing: border-box;
        border:0;
        border-radius:20px;
        font-family: inherit;
        outline: none;
    }
    .submit{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    button:hover{
        color:black;
        background:cadetblue;
        cursor:pointer;
    }

</style>