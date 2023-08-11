import { createRouter, createWebHistory } from 'vue-router'
import Play from "@/views/Play.vue";
import { removeToken } from "@/lib/storage/auth/TokenStorage";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'play',
      component: Play,
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
