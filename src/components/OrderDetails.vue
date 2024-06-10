<script setup lang="ts">
interface Order {
  id: string
  created_at: string
}
defineProps<{
  order: Order
}>()
</script>
<template>
  <div>
    <div>
      <span>{{ order.id }}</span> <br />
      <p>{{ order.created_at }}</p>
      <br />
      <br />
      <button>Aceitar</button>
      <button>Recusar</button>
      <br /><br />
      <hr />
    </div>
  </div>
</template>
