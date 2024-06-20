<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Request } from '@/utils/fetch'
import lojaSemFoto from '../assets/loja-sem-foto.png'
import { useRouter } from 'vue-router'

const data = ref<any>([])
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
  isNew.value = !isNew.value
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
  if (image.value) formData.append('store[image]', image.value as File)
  const { id } = (await request.post('/stores', formData)) as responseCreate
  router.push(`/store/${id}`)
}

onMounted(async () => {
  data.value = await request.get('/stores')
})
</script>

<template>
  <div class="page-container">
    <h1>Stores</h1>
    <button @click="create" class="create-button">Criar Loja</button>
    <div v-if="isNew" class="new-store-form">
      <label for="newStoreName">Nome da Loja:</label>
      <input id="newStoreName" v-model="newStore" type="text" class="input-text" />
      <input @change="createImage" type="file" class="input-file" />
      <button @click="save" class="save-button">Salvar</button>
    </div>
    <h2><strong>Lojas:</strong></h2>
    <div class="store-list">
      <div v-for="store in data" :key="store.id" class="store-item">
        <router-link :to="{ name: 'storeDetail', params: { id: store.id } }" class="store-link">
          <div class="store-button">
            <img
              v-if="store.image_url"
              :src="url + store.image_url"
              alt="Imagem da Loja"
              class="store-image"
            />
            <img v-else :src="lojaSemFoto" alt="Imagem da Loja" class="store-image" />
            <div class="store-details">
              <span class="store-name">{{ store.name }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.create-button,
.save-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.create-button:hover,
.save-button:hover {
  background-color: #0056b3;
}

.new-store-form {
  margin-bottom: 20px;
}

.input-text,
.input-file {
  display: block;
  margin-top: 5px;
  margin-bottom: 15px;
  padding: 8px;
  width: calc(100% - 16px);
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.store-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
}

.store-item {
  flex: 1 1 calc(33.33% - 20px);
  max-width: calc(33.33% - 20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  box-sizing: border-box;
  margin-bottom: 20px;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.store-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}

@media (max-width: 1024px) {
  .store-item {
    flex: 1 1 calc(50% - 20px);
    max-width: calc(50% - 20px);
  }
}

@media (max-width: 768px) {
  .store-item {
    flex: 1 1 calc(100% - 20px);
    max-width: calc(100% - 20px);
  }
}

.store-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.store-button {
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
  border: none;
  background: none;
  cursor: pointer;
  box-sizing: border-box;
}

.store-image {
  width: 50%;
  height: 100px;
  object-fit: cover;
  border-right: 1px solid #ccc;
}

.store-details {
  padding: 10px;
  flex-grow: 1;
}

.store-name {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}
</style>
