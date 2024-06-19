<script setup lang="ts">
import OrderDetails from '@/components/OrderDetails.vue'
import { Request } from '@/utils/fetch'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const url = 'http://localhost:3000'
const request = new Request(url)
const data = ref()
const route = useRoute()

onMounted(async () => {
  data.value = await request.get(`/store/${route.params.id}/orders`)
})
</script>
<template>
  <div class="orders-container">
    <h1>Pedidos</h1>
    <div v-for="order in data?.orders" :key="order.id" class="order-item">
      <router-link :to="{ name: 'orderDetail', params: { id: order.id } }" class="order-link">
        <div class="order-details">
          <OrderDetails :order="order" />
          <div class="order-status">
            <p v-if="order.state === 'created'" class="processing-status">
              Processando pagamento...
            </p>
            <p v-else class="processed-status">Pagamento efetuado!</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.orders-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.order-item {
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.order-link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  display: block;
}

.order-details {
  display: flex;
  align-items: center;
  padding: 15px;
  justify-content: space-between; /* Distribui o espaço entre os itens */
}

.order-status {
  text-align: right; /* Alinha o conteúdo à direita */
}

.processing-status {
  color: #ff6347; /* Vermelho */
}

.processed-status {
  color: #32cd32; /* Verde */
}
</style>
