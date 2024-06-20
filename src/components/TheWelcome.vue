<script setup lang="ts">
import { useRouter } from 'vue-router'
import imagem from '../assets/capa.jpeg'

const router = useRouter()
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <button @click="router.push('/signin')" class="btn-login">Entrar</button>
    <img :src="imagem" alt="" class="bg-img" />
  </div>
</template>

<style scoped>
.btn-login {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #2d3748;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.2s;
  text-transform: uppercase;
  z-index: 10;
}

.btn-login:hover {
  background-color: #1a202c;
  transform: scale(1.05);
}

.btn-login:focus {
  outline: none;
}

.bg-img {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}
.flex {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.h-screen {
  height: 100vh;
}
</style>
