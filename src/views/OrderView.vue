<script setup lang="ts">
import ChatBox from '@/components/ChatBox.vue'
import { formatDate } from '@/utils'
import { Request } from '@/utils/fetch'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const url = 'http://localhost:3000'
const request = new Request(url)
interface Order {
  buyer_id: number
  store_id: number
  order_items: any
  state: 'created' | 'paid' | 'accepted' | 'prepared' | 'shipped' | 'completed'
}
const data = ref<Order>({ state: 'created', order_items: [] } as Order)
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
  <div class="order-details">
    <h1>Pedidos</h1>
    <div v-if="data.state === 'created'" class="payment-not-confirmed">
      <p class="status-message">Pagamento não confirmado!</p>
      <button @click="changeState" class="action-button">Regerenciar pagamento do pedido</button>
    </div>
    <button v-else @click="changeState" class="state-button">{{ messageState[data.state] }}</button>
    <button v-if="data.state === 'paid'" class="reject-button">Rejeitar</button>
    <ChatBox v-if="data.buyer_id" :senderId="data.store_id" :receiverId="data.buyer_id" />
    <div v-for="item in data?.order_items" :key="item.id" class="order-item">
      <p class="product-title">{{ item.product.title }}</p>
      <img :src="url + item.product.image_url" alt="Imagem do Produto" class="product-image" />
      <p>{{ `Quantidade: ${item.amount}` }}</p>
      <p>{{ formatDate(item.created_at) }}</p>
      <p>{{ `Valor: ${item.price}` }}</p>
      <hr class="divider" />
    </div>
  </div>
</template>

<style scoped>
.order-details {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.payment-not-confirmed {
  margin-bottom: 20px;
}

.status-message {
  color: red;
  font-weight: bold;
}

.action-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #0056b3;
}

.state-button {
  padding: 15px 30px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 50%;
}

.state-button:hover {
  background-color: #218838;
}

.order-item {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.product-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.divider {
  margin-top: 10px;
  margin-bottom: 10px;
}

.reject-button {
  background-color: #ef4444;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  width: 50%;
  height: 45px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.reject-button:hover {
  background-color: #dc2626;
}
@media (max-width: 768px) {
  .order-item {
    padding: 15px;
  }

  .product-title {
    font-size: 16px;
  }

  .product-image {
    width: 120px;
    height: 120px;
  }
}
</style>
