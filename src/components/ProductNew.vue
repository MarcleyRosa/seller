<script setup lang="ts">
import { Request } from '@/utils/fetch'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { formatCurrency } from '../utils/index'
import type { Product } from '../utils/interfaces'

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
const data = ref<Product>({} as Product)

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
  <p>{{ `Titulo: ${data.title}` }}</p>
  <p>{{ `Preço: ${formatCurrency(+data.price)}` }}</p>
  <p>{{ `Estoque: ${data.stock}` }}</p>
  <img :src="url + data.image_url" alt="" />
  <div>
    <label for="">Titulo</label> <br />
    <input v-model="title" type="text" /> <br />
    <br />
    <label for="">Preço</label> <br />
    <input v-model="price" type="text" /> <br />
    <br />
    <label for="">Estoque</label> <br />
    <input v-model="stock" type="number" /> <br />
    <br />
    <label for="">Imagem</label> <br />
    <input @change="createImage" type="file" /> <br />
    <br />

    <button @click="save">Salvar</button>
  </div>
</template>
