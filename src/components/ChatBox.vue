<template>
  <div id="chat-container" v-if="isChatOpen">
    <div id="chat-header">
      <h1>Chat</h1>
      <button id="close-chat" @click="toggleChat">X</button>
    </div>
    <div id="chat-box">
      <div v-for="(message, index) in messages" :key="index" :class="message.class">
        {{ `${message.class === 'user-message' ? 'Eu: ' : `${user.email} : `}${message.content}` }}
      </div>
    </div>
    <div id="chat-input-container">
      <input
        type="text"
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Digite sua mensagem..."
      />
      <button @click="sendMessage">Enviar</button>
    </div>
  </div>
  <button id="open-chat" v-else @click="toggleChat">Chat</button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { createConsumer } from '@rails/actioncable'
import { Request } from '@/utils/fetch'

const props = defineProps<{
  senderId: number
  receiverId: number
}>()

const messages = ref<{ content: string; class: string }[]>([])
const newMessage = ref<string>('')
const isChatOpen = ref<boolean>(false)
const url = 'http://localhost:3000'
const request = new Request(url)
const user = ref()

const isDuplicateMessage = (messageContent: string) => {
  return messages.value.some((message) => message.content === messageContent)
}

let chatChannel: any = null

onMounted(async () => {
  user.value = await request.get(`/users/${props.receiverId}`)

  messages.value = await request.get(
    `/messages?sender_id=${props.senderId}&receiver_id=${props.receiverId}`
  )

  const consumer = createConsumer('ws://localhost:3000/cable')
  chatChannel = consumer.subscriptions.create(
    { channel: 'ChatChannel', sender_id: props.senderId, receiver_id: props.receiverId },
    {
      received(data: { message: string; sender_id: number }) {
        if (data.sender_id !== props.senderId && !isDuplicateMessage(data.message)) {
          messages.value.push({ content: data.message, class: 'bot-message' })
        }
      },
      speak(message: string) {
        this.perform('speak', { message: message })
      }
    }
  )
})

const sendMessage = () => {
  if (newMessage.value.trim() === '') return
  messages.value.push({ content: newMessage.value, class: 'user-message' })
  chatChannel.speak(newMessage.value)
  newMessage.value = ''
}

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value
}
</script>

<style scoped>
#chat-container {
  position: fixed;
  bottom: 0;
  right: 20px;
  max-width: 400px;
  width: 100%;
  max-height: 500px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
#chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
#close-chat {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
}
#chat-box {
  height: 300px;
  overflow-y: auto;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
}
#chat-input-container {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
}
input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: blue;
  color: white;
  cursor: pointer;
  margin-left: 10px;
}
#open-chat {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: blue;
  color: white;
  cursor: pointer;
}
.user-message {
  text-align: right;
  color: blue;
  margin-bottom: 10px;
}
.bot-message {
  text-align: left;
  color: green;
  margin-bottom: 10px;
}
</style>
