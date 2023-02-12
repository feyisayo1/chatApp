<template>
  <div class="chat-window">
    <div v-if="error">{{ error }}</div>
    <div v-if="documents" class="messages" ref="bottom">
        <div v-for="doc in formattedDocuments" :key="doc.id" class="single" :class="{ sender: doc.isSender }">
            <span class="created-at">{{ doc.createdAt }}</span>
            <span class="name"> {{ user.displayName }} :</span>
            <span class="message">{{ doc.message }}</span>
        </div>
    </div>
  </div>
</template>

<script>
import getCollection from '@/composables/getCollection';
import { formatISO9075 } from 'date-fns'
import { computed, onUpdated, ref } from 'vue';
Import getUser from '../composables/getUser';
export default {
    setup(){
        const {error, documents} = getCollection('messages')
        const { user } = getUser();

        const  formattedDocuments = computed(() => {
            if(documents.value){
                return documents.value.map(doc => {
                    let time = formatISO9075(doc.createdAt.toDate(), { representation: 'time' })
                    return { ...doc, createdAt: time}
                })
            }
        })

        const bottom = ref(null)

        onUpdated(() => {
            bottom.value.scrollTop = bottom.value.scrollHeight
            // console.log('hello');
            
        })

        return{error, documents, formattedDocuments, bottom, user}
    }
}
</script>

<style>
    .chat-window{
        background:#fafafa;
        padding:30px 20px;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
    }
    .single{
        margin:18px 0;
    }
    .created-at{
        display:block;
        /* display: flex; */
        font-size: 12px;
        margin-bottom:10px;
    }
    .name{
        font-weight: bold;
        margin-right: 6px;
        color:#e9edef;
    }
    .messages{
        scroll-behavior: smooth;
        max-height: 400px;
        overflow: auto;
     
    }

    .messages{
        flex:1 1 auto;
        /* overflow: hidden; */
        position: relative;
        width: 100%;
    }

    .messages .message{
        /* position: absolute; */
  top: 0;
  left: 0;
  height: 100%;
  color:#e9edef;
  padding-right: 60px;
  /* width: 100%; */
    }
    .messages .single {
  clear: both;
  float: left;
  padding: 10px 15px 20px;
  border-radius: 20px 20px 20px 0;
  background: aquamarine;
  /*rgba(0, 0, 0, 0.1);*/
  margin: 8px 0;
  font-size: 14px;
  line-height: 1.4;
  margin-right: 20px;
  margin-left: 20px;
  position: relative;
  border: 1px solid #ccc;
  /*text-shadow: 0 1px 1px rgba(0, 0, 0, .2);*/
}
.messages .created-at {
  position: absolute;
  bottom: -10px;
  font-size: 10px;
  color: #e9edef;
  right: 11px;
  /* color: rgba(255, 255, 255, .7);*/
}

.sender .created-at{
  right: 11px;

}

.messages .single{
  float: left;
  /* text-align: left; */
  /*      background: linear-gradient(120deg, #ddd, #eee);*/
  max-width: 50%;
  background: #202c33;
  border: 1px solid #ccc;
  border-radius: 20px 20px 20px 0px;
}

.messages .single.sender{
  max-width: 50%;
  float: right !important;
  /* text-align: right !important; */
  /*      background: linear-gradient(120deg, #ddd, #eee);*/
  background: #005c4b;
  border: 1px solid #ccc;
  border-radius: 20px 20px 0 20px !important;
}
.messages .single{
  transform: scale(1);
  transform-origin: 0 0;
  -webkit-animation: bounce 500ms linear both;
          animation: bounce 500ms linear both;
}
    /* .message{
        background: aquamarine;
        width:fit-content;
        padding:10px;
        margin:5px;
        border-radius: 10px;
    } */
    /* @media only screen and (max-width:500px){
        .message{
            font-size: 10px;
            font-style: italic;
        }
        .name {
            font-size:10px;
        }
        .message .single{
            margin-right: 0;
            margin-left: 0;
            padding: 10px 10px 20px;
            font-size: 10px;
        }
    } */
</style>
