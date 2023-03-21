import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/main/main.vue')
  }
]

const router = createRouter({
  routes: routes,
  history: createWebHistory()
})

export default router
