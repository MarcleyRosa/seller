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
      path: '/products/:id/store/:store_id',
      name: 'edit-product',
      component: () => import('../views/EditProduct.vue')
    },
    {
      path: '/products/create/:store_id',
      name: 'create',
      component: () => import('../views/CreateProduct.vue')
    },
    {
      path: '/store/:id/edit',
      name: 'edit-store',
      component: () => import('../views/EditStoreView.vue')
    }
  ]
})

export default router
