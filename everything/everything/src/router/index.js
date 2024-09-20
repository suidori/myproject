import TheRouletteView from '@/views/random/TheRouletteView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/roulette',
      name: 'roulette',
      component: TheRouletteView
    }
  ]
})

export default router
