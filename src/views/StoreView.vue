<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Request } from '@/utils/fetch'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import OrderDetails from '@/components/OrderDetails.vue'
import type { NewOrder, Store } from '../utils/interfaces'
import { options } from '@/utils'
import { formatDate } from '../utils'

const data = ref<Store[]>([])
const route = useRoute()
const router = useRouter()
const url = 'http://localhost:3000'
const request = new Request(url)
const newOrder = ref<NewOrder>({ time: new Date(), order: [] })

onMounted(async () => {
  data.value = await request.get(`/store/${route.params.id}/products`)

  await fetchEventSource(`${url}/stores/${route.params.id}/orders/new`, {
    ...options,
    async onopen(response) {
      if (response.ok) {
        console.log('connect')
        return
      }
    },
    onmessage(msg) {
      if (msg.event === 'new-order') {
        const data = JSON.parse(msg.data)
        newOrder.value = data
      }
    }
  })
})
</script>

<template>
  <div>
    <h2>Pedidos</h2>
    <button @click="router.push(`/store/${route.params.id}/edit`)">Editar Perfil da Loja</button>
    <button @click="router.push(`/store/${route.params.id}/products`)">Ver meus Produtos</button>
    <button @click="router.push(`/store/${route.params.id}/orders`)">Pedidos</button>
    <p>{{ `Pedidos ${formatDate(newOrder.time)}` }}</p>
    <div v-for="order in newOrder?.order" :key="order.id">
      <button id="order" @click="router.push(`/order/${order.id}`)">
        <OrderDetails :order="order" />
        <p v-if="order.state === 'created'" style="color: red">Processando pagamento...</p>
        <p v-else style="color: green">Pagamento efetuado!</p>
      </button>
    </div>
  </div>
</template>

<style scoped>
#order {
  width: 250px;
}
</style>
