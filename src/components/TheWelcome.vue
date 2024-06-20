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
/* Estilização para o botão de login */
.btn-login {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #2d3748; /* Cor de fundo do botão */
  color: #ffffff; /* Cor do texto */
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
  z-index: 10; /* Para ficar acima da imagem de fundo */
}

.btn-login:hover {
  background-color: #1a202c; /* Cor de fundo do botão ao passar o mouse */
  transform: scale(1.05); /* Efeito de escala ao passar o mouse */
}

.btn-login:focus {
  outline: none; /* Remove o contorno ao focar */
}

/* Estilização para a imagem de plano de fundo */
.bg-img {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Para garantir que a imagem cubra toda a tela */
  z-index: -1; /* Para ficar atrás do conteúdo */
}

/* Ajustes adicionais */
.flex {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative; /* Para que os elementos filhos possam ser posicionados relativamente */
}

.h-screen {
  height: 100vh; /* Altura total da tela */
}
</style>
