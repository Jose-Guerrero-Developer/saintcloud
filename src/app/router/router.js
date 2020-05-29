import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/app/layouts/wrapper-dashboard'),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard')
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('@/views/users')
      }
    ]
  },
  {
    path: '*',
    component: () => import('@/app/layouts/pages/not-found')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  router.app.$i18n.locale = router.app.$store.getters['i18n/locale']
  next()
})

export default router
