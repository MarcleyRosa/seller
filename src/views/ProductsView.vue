<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Request } from '@/utils/fetch'
import produtoSemFoto from '../assets/produto-sem-foto.png'
import type { Store } from '@/utils/interfaces'
import { formatCurrency } from '../utils'

const data = ref<Store[]>([])
const route = useRoute()
const router = useRouter()
const url = 'http://localhost:3000'
const request = new Request(url)

const edit = async (id: string) => {
  router.push(`/products/${id}/store/${route.params.id}`)
}

const remove = async (id: string) => {
  await request.delete(`/products/${id}`)
}

const create = () => {
  router.push(`/products/create/${route.params.id}`)
}

onMounted(async () => {
  data.value = await request.get(`/store/${route.params.id}/products`)
})
</script>

<template>
  <div class="products-list">
    <h1>Produtos</h1>
    <button @click="create" class="action-button">Criar Produto</button>
    <div v-for="product in data" :key="product.id" class="product-item">
      <div class="product-info">
        <h2>{{ product.title }}</h2>
        <p v-if="product.stock === 0" class="stock-status">Estoque esgotado!</p>
        <p class="product-price">{{ formatCurrency(+product.price) }}</p>
      </div>
      <button class="product-image-button">
        <img
          :src="product.image_url ? url + product.image_url : produtoSemFoto"
          alt="Imagem do Produto"
          class="product-image"
        />
      </button>
      <div class="product-buttons">
        <button @click="() => edit(product.id)" class="edit-button">Editar</button>
        <button @click="() => remove(product.id)" class="remove-button">Excluir</button>
      </div>
      <hr class="divider" />
    </div>
  </div>
</template>

<style scoped>
.products-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.action-button {
  padding: 10px 20px;
  background-color: #28a745; /* Verde */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #218838; /* Verde mais escuro */
}

.product-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
}

.product-info {
  flex: 1;
}

.product-info h2 {
  font-size: 20px;
  margin-bottom: 5px;
}

.stock-status {
  color: red;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
}

.product-image-button {
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.product-buttons {
  margin-left: auto;
}

.edit-button {
  padding: 8px 12px;
  margin-right: 5px;
  cursor: pointer;
  background-color: #007bff; /* Azul */
  color: #fff;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.edit-button:hover {
  background-color: #0056b3; /* Azul mais escuro */
}

.remove-button {
  padding: 8px 12px;
  margin-right: 5px;
  cursor: pointer;
  background-color: #dc3545; /* Vermelho */
  color: #fff;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.remove-button:hover {
  background-color: #c82333; /* Vermelho mais escuro */
}

.divider {
  margin-top: 10px;
  margin-bottom: 10px;
  border: 0.5px solid #ccc;
}
</style>
