<script setup lang="ts">
import { Request } from '@/utils/fetch'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { formatCurrency } from '../utils/index'
import type { Product } from '../utils/interfaces'
import noImage from '../assets/produto-sem-foto.png'

const props = defineProps<{
  method: 'post' | 'patch'
  path: string
}>()

const createImage = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    image.value = input.files[0]
  }
}

const title = defineModel('title', { default: '' })
const price = defineModel('price', { default: '' })
const stock = defineModel('stock', { default: 0 })

const image = ref<File | null>(null)
const url = 'http://localhost:3000'
const route = useRoute()
const request = new Request(url)
const data = ref<Product>({ title: '', price: '', stock: 0 } as Product)

onMounted(async () => {
  data.value = await request.get(`/products/${route.params.id}`)
})

const itens = reactive({
  store_id: route.params.store_id as string,
  title: title,
  price: price,
  stock: stock,
  image: image
})

const save = async () => {
  const formData = new FormData()
  const body = Object.entries(itens)

  body.forEach(([key, value]) => {
    if (value) formData.append(`product[${key}]`, value as any)
  })
  data.value = await request[props.method](props.path, formData)
}
</script>

<template>
  <div class="edit-product">
    <p>{{ `Título: ${data.title}` }}</p>
    <p>{{ `Preço: ${formatCurrency(+data.price)}` }}</p>
    <p>{{ `Estoque: ${data.stock}` }}</p>
    <img :src="data.image_url ? url + data.image_url : noImage" alt="" class="product-image" />
    <div class="form-container">
      <label for="editTitle">Título</label>
      <input id="editTitle" v-model="title" type="text" class="form-input" />

      <label for="editPrice">Preço</label>
      <input id="editPrice" v-model="price" type="text" class="form-input" />

      <label for="editStock">Estoque</label>
      <input id="editStock" v-model="stock" type="number" class="form-input" />

      <label for="editImage">Imagem</label>
      <input id="editImage" @change="createImage" type="file" class="form-input" />

      <button @click="save" class="save-button">Salvar</button>
    </div>
  </div>
</template>

<style scoped>
.edit-product {
  max-width: 600px;
  margin: 0 auto;
  padding: 100px;
  box-sizing: border-box;
  background-color: #f8f9fa;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.product-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
}

.form-container {
  margin-top: 20px;
}

.form-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #007bff;
}

.save-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-button:hover {
  background-color: #0056b3;
}
</style>
