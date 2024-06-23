<script setup lang="ts">
import { formatDate } from '@/utils'
import { Request } from '@/utils/fetch'
import { onMounted, ref } from 'vue'
import Swal from 'sweetalert2'
import type { User } from '../utils/interfaces'
import { useRouter } from 'vue-router'

const url = 'http://localhost:3000'
const request = new Request(url)
const data = ref<User>({} as User)
const router = useRouter()

onMounted(async () => {
  data.value = await request.get('/profile')
  console.log(data.value)
})

function confirmAction() {
  Swal.fire({
    title: 'Você tem certeza?',
    text: 'Você não poderá reverter isso!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, prosseguir!',
    cancelButtonText: 'Cancelar'
  }).then(async (result) => {
    if (result.isConfirmed) {
      await request.delete(`/profile/${data.value.id}`)
      router.push('/')
      console.log('Ação confirmada!')
      Swal.fire('Confirmado!', 'Sua ação foi confirmada.', 'success')
    } else {
      console.log('Ação cancelada!')
    }
  })
}
</script>

<template>
  <div class="profile-container">
    <p class="profile-title">Profile</p>
    <button @click="confirmAction" class="delete-button">Excluir Perfil</button>
    <p class="email">{{ data.email }}</p>
    <p class="created-at">{{ `Conta criada em: ${formatDate(data.created_at)}` }}</p>
    <div v-if="data.address" class="address">
      <p class="address-title">Endereço:</p>
      <p class="address-details">
        {{
          `${data.address.street} N° ${data.address.house_number}, ${data.address.neighborhood} - ${data.address.city}-${data.address.state}`
        }}
      </p>
      <p class="zip-code">{{ `CEP: ${data.address.zip_code}` }}</p>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  padding: 100px;
  border: 1px solid #ddd;
  border-radius: 5px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
}

.profile-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #c0392b;
}

.email,
.created-at,
.zip-code {
  font-size: 16px;
  margin: 5px 0;
}

.address {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
}

.address-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.address-details {
  margin-bottom: 5px;
}
</style>
