<script setup lang="ts">
import { Request } from '@/utils/fetch'
import { reactive, ref } from 'vue'
import { PhCheckFat, PhXCircle } from '@phosphor-icons/vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = defineModel('email', { default: '' })
const password = defineModel('password', { default: '' })
const password_confirmation = defineModel('password_confirmation', { default: '' })
const street = defineModel('street', { default: '' })
const house_number = defineModel('house_number', { default: '' })
const neighborhood = defineModel('neighborhood', { default: '' })
const city = defineModel('city', { default: '' })
const state = defineModel('state', { default: '' })
const zip_code = defineModel('zip_code', { default: '' })
const message = ref('')

const url = 'http://localhost:3000'
const request = new Request(url)

const signUp = async () => {
  const body = reactive({
    user: {
      email,
      password,
      password_confirmation,
      address: { street, house_number, neighborhood, city, state, zip_code }
    }
  })
  try {
    const { email: data } = (await request.post('/new', body)) as { email: string | undefined }

    if (data) {
      router.push('/signin')
    }
  } catch (error) {
    message.value = 'Ocorreu um erro ao tentar criar a conta'
  }
}
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="signUp" action="">
      <div class="form-group">
        <label for="email">Email:</label>
        <input required id="email" v-model="email" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label for="password">Senha:</label>
        <div style="display: flex">
          <input id="password" v-model="password" type="password" class="form-control" />
          <PhXCircle
            v-if="password_confirmation !== password || password.length < 4"
            color="red"
            :size="20"
            weight="fill"
          />
          <PhCheckFat v-else color="green" :size="20" weight="fill" />
        </div>
      </div>
      <div class="form-group">
        <label for="password_confirmation">Confirme a Senha:</label>
        <div style="display: flex">
          <input
            id="password_confirmation"
            v-model="password_confirmation"
            type="password"
            class="form-control"
          />
          <PhXCircle
            v-if="password_confirmation !== password || password.length < 4"
            color="red"
            :size="20"
            weight="fill"
          />
          <PhCheckFat v-else color="green" :size="20" weight="fill" />
        </div>
      </div>
      <p class="form-header">Endereço</p>
      <div class="form-group">
        <label for="street">Rua:</label>
        <input required id="street" v-model="street" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label for="house_number">N°:</label>
        <input required id="house_number" v-model="house_number" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label for="neighborhood">Bairro:</label>
        <input required id="neighborhood" v-model="neighborhood" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label for="city">Cidade:</label>
        <input required id="city" v-model="city" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label for="state">Estado:</label>
        <input required id="state" v-model="state" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label for="zip_code">CEP:</label>
        <input required id="zip_code" v-model="zip_code" type="text" class="form-control" />
      </div>
      <div class="form-actions">
        <button
          :disabled="password_confirmation !== password || password.length < 4"
          type="submit"
          class="btn create-account-btn"
        >
          Criar conta
        </button>
        <p style="color: red" v-if="password_confirmation !== password">Senhas não são iguais</p>
        <p style="color: red" v-if="password.length < 4">Senha menor que 4 caracters</p>
        <p style="color: red" v-if="message">{{ message }}</p>
      </div>
    </form>
  </div>
</template>

<style>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.form-header {
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn.create-account-btn {
  background-color: #28a745;
}

.btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
</style>
