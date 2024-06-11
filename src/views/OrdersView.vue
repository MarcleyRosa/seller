<script setup lang="ts">
import OrderDetails from '@/components/OrderDetails.vue'
import { Request } from '@/utils/fetch'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const url = 'http://localhost:3000'
const request = new Request(url)
const data = ref()
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  data.value = await request.get(`/store/${route.params.id}/orders`)
})
</script>
<template>
  <div>Pedidos</div>
  <div v-for="order in data?.orders" :key="order.id">
    <button @click="router.push(`/order/${order.id}`)">
      <OrderDetails :order="order" />
    </button>
  </div>
</template>
