<script setup lang="ts">
import ProductNew from '@/components/ProductNew.vue'
import { useFetchPost } from '@/utils/Functionsfetch'
import { ref } from 'vue'

const url = ref('http://localhost:3000/products')
</script>

<template>
  <div>
    <ProductNew :use-fetch="useFetchPost" :url="url" />
  </div>
</template>
