<script setup lang="ts">
import { formatDate } from '@/utils'

interface Order {
  id: string
  created_at: string
}
defineProps<{
  order: Order
}>()
</script>
<template>
  <div class="order-details-container">
    <div class="order-details">
      <span class="order-id">{{ order.id }}</span>
      <p class="order-date">{{ formatDate(order.created_at) }}</p>
      <hr class="order-divider" />
    </div>
  </div>
</template>

<style scoped>
.order-details-container {
  margin-bottom: 20px;
}

.order-details {
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 15px;
}

.order-id {
  font-size: 18px;
  font-weight: bold;
}

.order-date {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
}

.order-divider {
  margin-top: 10px;
}
</style>
