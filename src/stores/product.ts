import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', () => {
  const product = ref([])
  const id = computed(() => product.value)
  function increment(product: any) {
    product.value = product
  }

  return { product, id, increment }
})
