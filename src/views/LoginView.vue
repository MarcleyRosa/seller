<script setup lang="ts">
import { Request } from '@/utils/fetch'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

// const url = ref('http://localhost:3000/sign_in')
const email = defineModel('email', { default: '' })
const password = defineModel('password', { default: '' })
const router = useRouter()
const url = 'http://localhost:3000'
const request = new Request(url)

const signIn = async () => {
  const body = reactive({ login: { email, password } })
  const data = (await request.post('/sign_in', body)) as any

  localStorage.setItem('token', data.token)
  router.push('/stores')
}
</script>

<template>
  <div class="login-container">
    <p>orange.curry@example.com</p>
    <form @submit.prevent="signIn" action="">
      <label for="email">Email:</label>
      <input id="email" v-model="email" type="text" />
      <label for="password">Senha:</label>
      <input id="password" v-model="password" type="password" />
      <button type="button">Criar conta</button>
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<style scoped>
/* Estilização do container principal */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Mudança para alinhar ao topo */
  height: 100vh;
  background-color: #f0f2f5;
  padding: 20px 10px; /* Aumentado o padding superior */
}

/* Estilização do texto do email */
.login-container p {
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
  margin-top: 40px; /* Espaço superior para afastar do topo */
}

/* Estilização do formulário */
.login-container form {
  display: flex;
  flex-direction: column;
  width: 300px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Estilização dos labels */
.login-container form label {
  margin-bottom: 5px;
  font-size: 14px;
  color: #333;
}

/* Estilização dos inputs */
.login-container form input {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

/* Estilização dos botões */
.login-container form button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.login-container form button[type='submit'] {
  background-color: #007bff;
  color: white;
  margin-top: 10px;
}

.login-container form button[type='submit']:hover {
  background-color: #0056b3;
}

.login-container form button:not([type='submit']) {
  background-color: #6c757d;
  color: white;
  margin-top: 10px;
}

.login-container form button:not([type='submit']):hover {
  background-color: #5a6268;
}
</style>
