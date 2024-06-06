<script setup lang="ts">
import ProductNew from '@/components/ProductNew.vue'
import { ref } from 'vue'

const path = ref('/products')
</script>

<template>
  <div>
    <ProductNew method="post" :path="path" />
  </div>
</template>
