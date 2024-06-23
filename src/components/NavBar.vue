<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { PhUserCircle } from '@phosphor-icons/vue'

const router = useRouter()
const route = useRoute()

const logout = () => {
  localStorage.removeItem('token')
  router.push('/')
}
</script>

<template>
  <div>
    <div
      v-if="route.path !== '/' && route.path !== '/signin' && route.path !== '/signup'"
      class="navbar-container"
    >
      <img alt="Vue logo" class="logo" src="@/assets/18157271.jpg" />
      <nav class="navbar">
        <a href="/" class="nav-link">Home</a>
        <a href="/signin" class="nav-link">Entrar</a>
      </nav>
      <button style="background-color: #2c3e50" @click="router.push('/profile')">
        <PhUserCircle :size="32" weight="fill" />
      </button>

      <button @click="logout" class="logout-button">Logout</button>
    </div>
  </div>
</template>

<style scoped>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.navbar-container {
  background-color: #2c3e50;
  color: white;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.logo {
  width: 50px;
  height: 50px;
  margin-right: 20px;
}

.navbar {
  display: flex;
  gap: 20px;
  flex-grow: 1;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #1abc9c;
}

.logout-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 20px;
}

.logout-button:hover {
  background-color: #c0392b;
}

.main-content {
  margin-top: 60px;
  padding: 20px;
}
</style>
