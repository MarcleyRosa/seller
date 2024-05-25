<script setup lang="ts">
import router from '@/router';

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