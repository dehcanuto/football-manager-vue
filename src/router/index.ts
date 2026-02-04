import { createRouter, createWebHistory } from 'vue-router'

import MatchView from '../views/MatchSimulator.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, left: 0 }
    }
  },
  routes: [
    {
      path: '/',
      component: MatchView,
    },
    ]
})

export default router