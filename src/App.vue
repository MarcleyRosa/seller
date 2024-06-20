<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="navbar nav">
    <NavBar />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
