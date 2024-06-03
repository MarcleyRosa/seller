<script setup lang="ts">
import ProductNew from '@/components/ProductNew.vue'
import { useFetchUpdate } from '@/utils/Functionsfetch'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const url = ref(`http://localhost:3000/products/${route.params.id}`)
</script>

<template>
  <div>
    <ProductNew :use-fetch="useFetchUpdate" :url="url" />
  </div>
</template>
