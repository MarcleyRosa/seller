<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Request } from '@/utils/fetch'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import OrderDetails from '@/components/OrderDetails.vue'
import type { NewOrder, Store } from '../utils/interfaces'
import { options } from '@/utils'
import { formatDate } from '../utils'
import noImageStore from '../assets/loja-sem-foto.png'

const data = ref<Store>({
  active: false,
  name: '',
  store_id: '',
  id: '',
  title: '',
  price: '',
  image_url: '',
  stock: 0
})
const route = useRoute()
const router = useRouter()
const url = 'http://localhost:3000'
const request = new Request(url)
const newOrder = ref<NewOrder>({ time: new Date(), order: [] })

const activeStore = async () => {
  data.value = await request.patch(`/stores/${route.params.id}`, { active: !data.value.active })
}

onMounted(async () => {
  data.value = await request.get(`/stores/${route.params.id}`)

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
        const respoonse = JSON.parse(msg.data)
        newOrder.value = respoonse
      }
    }
  })
})
</script>

<template>
  <div class="store-container">
    <h3 class="store-name">{{ data.name }}</h3>
    <img
      :src="data.image_url ? url + data.image_url : noImageStore"
      alt="Store Image"
      class="store-image"
    />
    <div class="button-group">
      <button @click="router.push(`/store/${route.params.id}/edit`)" class="action-button">
        Editar Perfil da Loja
      </button>
      <button @click="router.push(`/store/${route.params.id}/products`)" class="action-button">
        Ver meus Produtos
      </button>
      <button @click="router.push(`/store/${route.params.id}/orders`)" class="action-button">
        Pedidos
      </button>
      <button :id="data.active ? 'open' : 'close'" @click="activeStore" class="action-button">
        {{ data.active ? 'Fechar Loja' : 'Abrir Loja' }}
      </button>
    </div>
    <p class="order-info">{{ `Pedidos ${formatDate(newOrder.time)}` }}</p>
    <div v-for="order in newOrder?.order" :key="order.id" class="order-item">
      <button id="order" @click="router.push(`/order/${order.id}`)" class="order-button">
        <OrderDetails :order="order" />
        <p v-if="order.state === 'created'" class="order-status processing">
          Processando pagamento...
        </p>
        <p v-else class="order-status paid">Pagamento efetuado!</p>
      </button>
    </div>
  </div>
</template>

<style scoped>
.store-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.store-name {
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
}

.store-image {
  display: block;
  width: 100%;
  max-width: 300px;
  height: auto;
  margin: 0 auto 20px;
  border-radius: 8px;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
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

#open {
  background-color: green;
}

#open:hover {
  background-color: darkgreen;
}

#close {
  background-color: red;
}

#close:hover {
  background-color: darkred;
}

.order-info {
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.order-item {
  margin-bottom: 10px;
}

.order-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  width: 100%;
  border: none;
  background: none;
  cursor: pointer;
  box-sizing: border-box;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.order-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  background-color: darkgray;
}

.order-status {
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}

.processing {
  color: red;
}

.paid {
  color: green;
}
</style>
