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
  <div class="container">
    <h1>Editar Loja</h1>

    <label for="name">Nome da Loja</label>
    <input v-model="name" type="text" id="name" />

    <label for="photo">Foto</label>
    <input @change="createImage" type="file" id="photo" name="photo" />

    <button @click="save" class="save-button">Salvar</button>
  </div>
</template>

<style scoped>
/* Estilo para o contêiner do formulário */
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

/* Estilo para o título */
h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

/* Estilo para as labels */
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

/* Estilo para os inputs */
input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

/* Estilo para o botão de salvar */
.save-button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.save-button:hover {
  background-color: #45a049;
}
</style>
