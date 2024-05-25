<script setup lang="ts">
import { useFetchGet, useFetchPost } from '@/utils/fetch';
import { onMounted, ref } from 'vue';
import router from '@/router';

const data = ref([])
const isNew = ref(false)
const url = ref('http://localhost:3000/stores')
const newStore = defineModel('newStore', { default: ""})

const create = () => {
  isNew.value = true
}

const save = async () => {
  const { id } = await useFetchPost(url.value, { store: { name: newStore.value }})

  router.push(`/store/${id}`)
}

const start = ({ target: { id } }: any) => {
  
  router.push(`/store/${id}`)
}

onMounted(async () => {
  data.value = await useFetchGet(url.value)
})

</script>

<template>
  <div>
    <h1>Stores</h1> <br> <br>

    <br> <br> <br>

    <button @click="create">Criar Loja</button>
    <div v-if="isNew">
      <label for="">Nome da Loja:</label>
      <input v-model="newStore" type="text">
      <button @click="save">Salvar</button>
    </div>
     <br> <br> <br>

    <h2><strong>Lojas:</strong></h2> <br>

    <div v-for="{ name, id } in data" :key="id">
      <span>{{ name }}</span> <br>
      <button @click="start" :id=id>Entrar</button>
      <br><br>
      <hr>
    </div>

    </div>
</template>