<script setup lang="ts">
import { useFetchGet } from '@/utils/fetch';
import { onMounted, ref } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';

const data = ref([])
const route = useRoute()

const edit = async ({ target: { id }}: any) => {
  router.push(`/products/edit/${id}`)
}

onMounted(async () => {
  console.log(router);
  
  data.value = await useFetchGet(`http://localhost:3000/store/${route.params.id}/products`)
})

</script>

<template>
  <div>
    
    <div v-for="{ title, id, price, image, store_id } in data" :key="id">
      <h1>{{ store_id  }}</h1>
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