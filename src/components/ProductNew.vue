<script setup lang="ts">
import router from '@/router';
import { reactive } from 'vue'
import { useRoute } from 'vue-router';

const title = defineModel('title', { default: ''})
const price = defineModel('price', { default: ''})
const img = defineModel('img', { default: ''})

const route = useRoute()

interface iBody {
  product: { title: string, price: string, image: string }
}

const request = defineProps<{
  useFetch: (url: string, body: iBody) => {}
  url: string
}>()

const save = async () => {
  
  const body = reactive({ product: { store_id: route.params.store_id, title: title.value, price: price.value, image: img.value } })
  request.useFetch(request.url, body)
 
  router.back()
}

</script>

<template>
  <div>
    <label for="">Titulo</label> <br>
    <input v-model="title" type="text">  <br> <br>
    <label for="">Preço</label> <br>
    <input v-model="price" type="text"> <br> <br>
    <label for="">Imagem</label> <br>
    <input v-model="img" type="text"> <br> <br> <br>


    <button @click="save">Salvar</button>
  </div>
</template>