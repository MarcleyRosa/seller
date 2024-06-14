<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Request } from '@/utils/fetch'
import lojaSemFoto from '../assets/loja-sem-foto.png'
import { useRouter } from 'vue-router'

const data = ref([])
const isNew = ref(false)
const url = ref('http://localhost:3000')
const newStore = defineModel('newStore', { default: '' })
const image = ref<File | null>(null)
const router = useRouter()

interface responseCreate {
  id: string
}

const request = new Request(url.value)
const create = () => {
  isNew.value = true
}

const createImage = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    image.value = input.files[0]
  }
}

const save = async () => {
  const formData = new FormData()

  formData.append('store[name]', newStore.value)
  formData.append('store[image]', image.value as File)
  const { id } = (await request.post('/stores', formData)) as responseCreate
  router.push(`/store/${id}`)
}

const start = ({ target: { id } }: any) => {
  router.push(`/store/${id}`)
}

onMounted(async () => {
  data.value = await request.get('/stores')
})
</script>

<template>
  <div>
    <h1>Stores</h1>
    <br />
    <br />

    <button @click="create">Criar Loja</button>
    <div v-if="isNew">
      <label for="">Nome da Loja:</label>
      <input v-model="newStore" type="text" />
      <input @change="createImage" type="file" />
      <button @click="save">Salvar</button>
    </div>
    <br />
    <br />
    <br />

    <h2><strong>Lojas:</strong></h2>
    <br />
    <div v-for="{ name, id, image_url } in data" :key="id">
      <button @click="start" :id="id">
        <span>{{ name }}</span> <br />
        <img
          :id="id"
          width="200px"
          :src="image_url ? url + image_url : lojaSemFoto"
          alt="image Loja"
        />
      </button>
      <br /><br />
      <hr />
    </div>
  </div>
</template>
