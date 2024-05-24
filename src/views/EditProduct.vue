<script setup lang="ts">
import router from '@/router';
import { useFetchUpdate } from '@/utils/fetch';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

const title = defineModel('title', { default: ''})
const price = defineModel('price', { default: ''})
const img = defineModel('img', { default: ''})

const route = useRoute()

const save = async () => {
  const url = ref(`http://localhost:3000/products/${route.params.id}`)
  
  const body = reactive({ product: { title: title.value, price: price.value, image: img.value } })
  await useFetchUpdate(url.value, body)
 
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