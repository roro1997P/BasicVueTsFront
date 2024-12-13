import { createRouter, createWebHistory } from 'vue-router'
import HeroesView from '../views/HeroesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HeroesView,
    }
  ],
})

export default router
