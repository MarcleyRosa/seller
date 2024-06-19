<script setup lang="ts">
import { useFetchPost } from '@/utils/Functionsfetch'
import { reactive, ref } from 'vue'
import router from '@/router'

const url = ref('http://localhost:3000/sign_in')
const email = defineModel('email', { default: '' })
const password = defineModel('password', { default: '' })

const signIn = async () => {
  const body = reactive({ login: { email, password } })
  const data = await useFetchPost(url.value, body)

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
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
  padding: 20px;
}

/* Estilização do texto do email */
.login-container p {
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
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

@media (min-width: 1024px) {
  .login-container {
    padding-top: calc(100px + 20px);
    width: 1000px;
  }
}

@media (min-width: 1100px) {
  .login-container {
    padding-top: calc(100px + 20px);
    width: 1220px;
  }
}

@media (max-width: 768px) {
  .login-container {
    padding-top: calc(120px + 20px); /* Ajuste conforme necessário */
  }
}

@media (max-width: 480px) {
  .login-container {
    padding-top: calc(140px + 20px); /* Ajuste conforme necessário */
  }
}
</style>
