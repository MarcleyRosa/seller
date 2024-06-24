<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div
    class="flex items-center justify-center h-screen bg-cover bg-center"
    style="background-image: url('path-to-your-background-image.jpg')"
  >
    <div class="text-center bg-white bg-opacity-75 p-8 rounded-lg shadow-lg">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">Bem-vindo ao Delivry do Vendedor</h1>
      <p class="text-lg text-gray-600 mb-8">Por favor, faça login para continuar</p>
      <button @click="router.push('/signin')" class="btn-login">Entrar</button>
    </div>
  </div>
</template>

<style scoped>
.bg-cover {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.text-center {
  max-width: 500px;
  margin: auto;
}

/* Estilize o botão de login */
.btn-login {
  padding: 0.75rem 2rem;
  font-size: 1.25rem;
  color: white;
  background-color: #1d4ed8; /* Azul */
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}

.btn-login:hover {
  background-color: #2563eb; /* Azul mais claro */
  transform: translateY(-2px);
}

.btn-login:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.5);
}
</style>
