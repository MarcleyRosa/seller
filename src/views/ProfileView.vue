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
  <div>
    <br />
    <br />
    <br /><br /><br />
    <p>Profile</p>
    <button @click="confirmAction">Excluir Perfil</button>
    <p>{{ data.email }}</p>
    <p>{{ `Conta criada em: ${formatDate(data.created_at)}` }}</p>
    <div v-if="data.address">
      Endereço:
      <p>
        {{
          `${data.address.street} N° ${data.address.house_number}, ${data.address.neighborhood} - ${data.address.city}-${data.address.state}`
        }}
      </p>
      <p>{{ `CEP: ${data.address.zip_code}` }}</p>
    </div>
  </div>
</template>
