<script setup lang="ts">
import { formatDate } from '@/utils'
import { Request } from '@/utils/fetch'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const url = 'http://localhost:3000'
const request = new Request(url)
const data = ref<{
  order_items: any
  state: 'created' | 'paid' | 'accepted' | 'prepared' | 'shipped' | 'completed'
}>({ state: 'created', order_items: [] })
const route = useRoute()

const changeStates = {
  created: 'paid',
  paid: 'accepted',
  accepted: 'prepared',
  prepared: 'shipped',
  shipped: 'completed',
  completed: 'complete'
}
const messageState = reactive({
  ...changeStates
})
const state = ref<'created' | 'paid' | 'accepted' | 'prepared' | 'shipped' | 'completed'>('created')

const changeState = async () => {
  // data.value = await request.get(`/order/${route.params.id}`)

  const newState = (await request.patch(`/buyers/orders/${route.params.id}`, {
    order: { state: changeStates[data.value.state] }
  })) as any
  state.value = newState.state
}

watch(state, async () => {
  data.value = await request.get(`/order/${route.params.id}`)
})

onMounted(async () => {
  data.value = await request.get(`/order/${route.params.id}`)
})
</script>
<template>
  <h1>Pedidos</h1>
  <div v-if="data.state === 'created'">
    <p style="color: red">Pagamento não confirmado!</p>
    <button @click="changeState">Regenciar pagamento do pedido</button>
  </div>
  <button class="btt" v-else @click="changeState">{{ messageState[data.state] }}</button>
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

<style scoped>
.btt {
  width: 350px;
  height: 30px;
}
</style>
