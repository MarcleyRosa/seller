<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <NavBar v-once />
    <TheWelcome />
  </main>
</template>
