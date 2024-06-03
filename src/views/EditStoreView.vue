<script setup lang="ts">
import { Request } from '@/utils/fetch'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const request = new Request('http://localhost:3000')
const route = useRoute()
const router = useRouter()
const name = defineModel('name', { default: '' })
const image = ref<File | null>(null)

const createImage = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    image.value = input.files[0]
  }
}

const save = async () => {
  const formData = new FormData()

  formData.append('store[name]', name.value)
  formData.append('store[image]', image.value as File)

  await request.patch(`/stores/${route.params.id}`, formData)
  router.back()
}
</script>
<template>
  <div>
    <h1>Editar Loja</h1>

    <label for="">Nome da Loja</label>
    <input v-model="name" type="text" />
    <label for="">Foto</label>
    <input @change="createImage" type="file" name="" id="" />

    <button @click="save">Salvar</button>
  </div>
</template>
