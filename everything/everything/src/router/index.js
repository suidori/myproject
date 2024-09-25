import TheRouletteView from '@/views/random/TheRouletteView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TheLadderView from '@/views/random/TheLadderView.vue'

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
    },
    {
      path: '/ladder',
      name: 'ladder',
      component: TheLadderView
    }
  ]
})

export default router
