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
    component: () => import('@/core/layouts/container/wrapper-dashboard'),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard')
      },
      {
        path: '/languages',
        name: 'languages',
        component: () => import('@/views/languages')
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('@/views/users')
      },
      {
        path: '/roles-and-responsibilities',
        name: 'roles-and-responsibilities',
        component: () => import('@/views/roles-and-responsibilities')
      }
    ]
  },
  {
    path: '*',
    component: () => import('@/core/layouts/pages/not-found')
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
