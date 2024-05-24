<script setup lang="ts">
import { useFetchGet } from '@/utils/fetch';
import { onMounted, ref } from 'vue';
import router from '@/router';

const data = ref([])

const criar = () => {

}

const start = ({ target: { id } }: any) => {
  
  router.push(`/store/${id}`)
}

onMounted(async () => {
  data.value = await useFetchGet('http://localhost:3000/stores')
})

</script>

<template>
  <div>
    <h1>Stores</h1> <br> <br>

    <br> <br> <br>

    <button @click="criar">Criar Loja</button> <br> <br> <br>

    <h2><strong>Lojas:</strong></h2> <br>

    <div v-for="{ name, id } in data" :key="id">
      <span>{{ name }}</span> <br>
      <button @click="start" :id=id>Entrar</button>
      <br><br>
      <hr>
    </div>

    </div>
</template>