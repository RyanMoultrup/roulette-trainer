import { createRouter, createWebHistory } from 'vue-router'
import Play from "@/views/Play.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Play,
      meta: { layout: 'default' }
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login.vue'),
      meta: { layout: 'blank' }
    }
  ]
})

export default router
