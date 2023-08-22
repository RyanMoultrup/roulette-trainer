import Play from "@/views/Play.vue"
import Home from "@/views/Home.vue"
import { createRouter, createWebHistory } from 'vue-router'
import { removeToken } from "@/lib/storage/auth/TokenStorage"
import store from '@/store/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        store.commit('simulation/updateMode', 'practice')
        next()
      },
      meta: { layout: 'default' }
    },
    {
      path: '/game/play',
      name: 'play',
      component: Play,
      beforeEnter: (to, from, next) => {
        store.commit('simulation/updateMode', 'practice')
        next()
      },
      meta: { layout: 'default' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: { layout: 'blank' }
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: (to, from, next) => {
        removeToken()
        next({ name: 'login' })
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
      meta: { layout: 'blank' }
    },
    {
      path: '/game/:gameId',
      name: 'game',
      component: () => import('../views/Game.vue'),
      beforeEnter: (to, from, next) => {
        store.commit('simulation/updateMode', 'review')
        next()
      },
      props: true,
      meta: { layout: 'default' }
    },
    {
      path: '/table',
      name: 'table',
      component: () => import('../components/charts/RadialWheelChart.vue'),
      meta: { layout: 'default' }
    }
  ]
})

function isLoggedIn() {
  return localStorage.getItem('auth._token');
}

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && to.name !== 'register' && !isLoggedIn()) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
