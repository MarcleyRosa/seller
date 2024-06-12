<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  router.push('/')
}
</script>

<template>
  <div>
    <button @click="logout">Logout</button>
  </div>
</template>
