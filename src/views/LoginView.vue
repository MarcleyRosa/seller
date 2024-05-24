<script setup lang="ts">
import { useFetchPost } from '@/utils/fetch';
import { reactive, ref } from 'vue';
import router from '@/router';

const url = ref('http://localhost:3000/sign_in')
const resp = ref(null)
const email = defineModel('email', { default: ''})
const password = defineModel('password', { default: ''})

const signIn = async () => {
  const body = reactive({ login: { email, password } })
  const data = await useFetchPost(url.value, body)
  
  console.log(data);
  localStorage.setItem('token', data.token)
  router.push('/stores')
  
}

</script>

<template>
  <div>
    {{ resp }}
    <form @submit.prevent="signIn" action="">
      <label for="">Email:</label>
      <input v-model="email" type="text">
      <label for="">Senha:</label>
      <input v-model="password" type="password"> <br> <br> <br>
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>