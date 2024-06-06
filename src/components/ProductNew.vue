<script setup lang="ts">
import { Request } from '@/utils/fetch'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps<{
  method: 'post' | 'patch'
  path: string
}>()

const createImage = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    image.value = input.files[0]
  }
}

const title = defineModel('title', { default: '' })
const price = defineModel('price', { default: '' })
const image = ref<File | null>(null)

const route = useRoute()
const router = useRouter()
const request = new Request('http://localhost:3000')

const save = async () => {
  const formData = new FormData()

  formData.append('product[store_id]', route.params.store_id as string)
  formData.append('product[title]', title.value)
  formData.append('product[price]', price.value)
  formData.append('product[image]', image.value as File)
  await request[props.method](props.path, formData)

  router.back()
}
</script>

<template>
  <div>
    <label for="">Titulo</label> <br />
    <input v-model="title" type="text" /> <br />
    <br />
    <label for="">Preço</label> <br />
    <input v-model="price" type="text" /> <br />
    <br />
    <label for="">Imagem</label> <br />
    <input @change="createImage" type="file" /> <br />
    <br />

    <button @click="save">Salvar</button>
  </div>
</template>
