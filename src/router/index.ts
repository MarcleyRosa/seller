import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView
    },
    {
      path: '/stores',
      name: 'stores',
      component: () => import('../views/StoresView.vue')
    },
    {
      path: '/store/:id',
      name: 'store',
      component: () => import('../views/StoreView.vue')
    },
    {
      path: '/products/edit/:id',
      name: 'edit',
      component: () => import('../views/EditProduct.vue')
    }
  ]
})

export default router
