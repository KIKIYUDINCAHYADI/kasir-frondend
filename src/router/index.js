import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '@/views/AdminView.vue'
import KasirView from '@/views/KasirView.vue'

const routes = [
  { path: '/', name: 'Kasir', component: KasirView },
  { path: '/admin', name: 'Admin', component: AdminView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
