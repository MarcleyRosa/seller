<script setup lang="ts">
import { useRouter } from 'vue-router'
// import { RouterLink } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  router.push('/')
}
</script>

<template>
  <div class="navbar">
    <img alt="Vue logo" class="logo" src="@/assets/18157271.jpg" />
    <nav>
      <!-- Adicione seus links de navegação aqui -->
      <!-- <RouterLink to="/">Home</RouterLink> -->
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
    <button @click="logout">Logout</button>
  </div>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f8f9fa;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

/* Estilização dos itens dentro do NavBar */
.navbar .logo {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.navbar nav {
  display: flex;
  gap: 20px;
}

.navbar nav a {
  text-decoration: none;
  color: #333;
  font-size: 18px;
  font-weight: bold;
}

.navbar nav a:hover {
  color: #007bff;
}

.navbar button {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.navbar button:hover {
  background-color: #c82333;
}

/* Ajuste do espaçamento do conteúdo principal */
main {
  margin-top: 80px; /* Espaço suficiente para o NavBar fixo */
}
</style>
