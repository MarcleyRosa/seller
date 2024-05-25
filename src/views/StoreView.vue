<script setup lang="ts">
import { useFetchGet } from '@/utils/fetch';
import { onMounted, ref } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';

interface store {
  store_id: string, id: string, title: string, price: string, image: string
}

const data = ref<store[]>([])
const route = useRoute()

const edit = async ({ target: { id }}: any) => {
  router.push(`/products/${id}/store/${route.params.id}`)
}

const create = () => {
  router.push(`/products/create/${route.params.id}`)
}

onMounted(async () => {
  data.value = await useFetchGet(`http://localhost:3000/store/${route.params.id}/products`)
})

</script>

<template>
  <div>
    <h1>Produtos</h1>
    <button @click="create">Criar Produto</button>
    <div v-for="{ title, id, price, image } in data" :key="id">
      <span>{{ title }}</span> <br>
      <p>{{ price }}</p>
      <button>
        <img v-if="image" width="100px" :src="image" alt="">
        <img v-else width="100px" src="../assets/produto-sem-foto.png" alt="">
      </button> <br> <br>
      <button @click="edit" :id=id>Editar</button>
      <br><br>
      <hr>
    </div>

    </div>
</template>