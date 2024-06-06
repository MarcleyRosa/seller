<script setup lang="ts">
import ProductNew from '@/components/ProductNew.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const path = ref(`/products/${route.params.id}`)
</script>

<template>
  <div>
    <ProductNew method="patch" :path="path" />
  </div>
</template>
