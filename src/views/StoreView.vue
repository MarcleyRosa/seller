<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Request } from '@/utils/fetch'
import produtoSemFoto from '../assets/produto-sem-foto.png'

interface store {
  store_id: string
  id: string
  title: string
  price: string
  image_url: string
}

const data = ref<store[]>([])
const route = useRoute()
const router = useRouter()
const url = 'http://localhost:3000'
const request = new Request(url)

const edit = async ({ target: { id } }: any) => {
  router.push(`/products/${id}/store/${route.params.id}`)
}

// const deleteStore = async () => {
//   await request.delete(`/stores/${route.params.id}`)
//   router.back()
// }

const create = () => {
  router.push(`/products/create/${route.params.id}`)
}

onMounted(async () => {
  data.value = await request.get(`/store/${route.params.id}/products`)
})
</script>

<template>
  <div>
    <button @click="router.push(`/store/${route.params.id}/edit`)">Editar Perfil da Loja</button>
    <h1>Produtos</h1>
    <button @click="create">Criar Produto</button>
    <div v-for="{ title, id, price, image_url } in data" :key="id">
      <span>{{ title }}</span> <br />
      <p>{{ price }}</p>
      <button>
        <img
          style="width: 100px"
          :src="image_url ? url + image_url : produtoSemFoto"
          alt="image Loja"
        />
      </button>
      <br />
      <br />
      <button @click="edit" :id="id">Editar</button>
      <br /><br />
      <hr />
    </div>
  </div>
</template>
