<script setup lang="ts">
import { formatDate } from '@/utils'
import { Request } from '@/utils/fetch'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const url = 'http://localhost:3000'
const request = new Request(url)
const data = ref()
const route = useRoute()

onMounted(async () => {
  data.value = await request.get(`/order/${route.params.id}`)
})
</script>
<template>
  <div>Pedidos</div>
  <div
    v-for="{ id, amount, created_at, price, product: { title, image_url } } in data?.order_items"
    :key="id"
  >
    <p>{{ title }}</p>
    <img height="150px" width="150px" :src="url + image_url" alt="image product" />
    <p>{{ `Quantidade: ${amount}` }}</p>
    <p>{{ formatDate(created_at) }}</p>
    <p>{{ `Valor: ${price}` }}</p>
    <hr />
  </div>
</template>
