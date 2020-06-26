import Vue       from 'vue'
import VueRouter from 'vue-router'

/**
 * En: Importing middleware rules
 * Es: Importando reglas de middleware
 */
import { AuthMiddleware                 } from '@/middlewares/AuthMiddleware'
import { MiddlewareLoader               } from '@/middlewares/MiddlewareLoader'
import { IsActiveSessionLoginMiddleware } from '@/middlewares/IsActiveSessionLoginMiddleware'

/**
 * En: Importing components for routes
 * Es: Importación de componentes para las rutas
 */
import Login                    from '@/views/login'
import Users                    from '@/views/users'
import SignOut                  from '@/views/sign-out'
import NotFound                 from '@/layouts/pages/not-found'
import Dashboard                from '@/views/dashboard'
import Languages                from '@/views/languages'
import WrapperAuth              from '@/layouts/container/wrapper-auth'
import ForgotPassword           from '@/views/forgot-password'
import WrapperDashboard         from '@/layouts/container/wrapper-dashboard'
import RolesAndResponsibilities from '@/views/roles-and-responsibilities'

Vue.use(VueRouter)

/**
 * En: Returns the route configuration
 * Es: Retorna la configuración de rutas
 * @return Array
 */
const routes = Array(
  /**
   * En: Profile Logout Path
   * Es: Ruta de cerrar sesión de perfil
   */
  { path: '/sign-out', name: 'sign-out', component: SignOut },
  /**
   * En: Credentials authentication route group
   * Es: Grupo de rutas de autentificación de credenciales
   */
  { path: '/', component: WrapperAuth,
    children: [
      /**
       * En: Login Path
       * Es: Ruta de inicio de sesión
       */
      { path: '/', name: 'login', component: Login, meta: { middleware: [ IsActiveSessionLoginMiddleware ] } },
      /**
       * En: Password reset path
       * Es: Ruta de restablecer contraseña
       */
      { path: '/forgot-password', name: 'forgot-password', component: ForgotPassword },
    ]
  },
  /**
   * En: Structure containing the template for the board
   * Es: Estructura que contiene la plantilla para el tablero
   */
  { path: '/', component: WrapperDashboard,
    children:  Array(
      /**
       * En: Board route
       * Es: Ruta de tablero
       */
      { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { middleware: [ AuthMiddleware ] } },
      /**
       * En: Language Route
       * Es: Ruta de idiomas
       */
      { path: '/languages', name: 'languages', component: Languages, meta: { middleware: [ AuthMiddleware ] } },
      /**
       * En: Users' route
       * Es: Ruta de usuarios
       */
      { path: '/users', name: 'users', component: Users, meta: { middleware: [ AuthMiddleware ] } },
      /**
       * En: Roles and permissions route
       * Es: Ruta de roles y permisos
       */
      { path: '/roles-and-responsibilities', name: 'roles-and-responsibilities', component: RolesAndResponsibilities, meta: { middleware: [ AuthMiddleware ] } }
    )
  },
  /**
   * En: Page request path not found
   * Es: Ruta de solicitud de página no encontrada
   */
  { path: '*', component: NotFound }
)

/**
 * En: Set the instance with Vue Router
 * Es: Establece la instancia con Vue Router
 * @return VueRouter
 */
const router = new VueRouter({
  mode: 'history', routes
})

/**
 * En: Set configurations before loading the routing
 * Es: Establece configuraciones antes de cargar el sistema de rutas
 * @param {*} to
 * @param {*} from
 * @param {*} next
 * @return next
 */
router.beforeEach((to, from, next) => {
  const Vue         = router.app
  const {
    $i18n, $store } = Vue
  /* En: Upload all local storage configurations to the Vuex store
     Es: Cargar todas la configuraciones del local storage a la tienda de Vuex */
  if ($store.getters['app/route-is-reloaded']) { $store.dispatch('app/load-inital-state', Vue) }
  $i18n.locale = $store.getters['i18n/locale']
  if (!to.meta.middleware) {
    return next()
  }
  const middleware      = to.meta.middleware
  const isActiveToken   = $store.getters['auth/is-active-token']
  const hasExpiredToken = $store.getters['auth/has-expired-token'](Vue)
  const context         = {
    to, Vue, next, from,
    isActiveToken, hasExpiredToken
  }
  return middleware[0]({ ...context, next: MiddlewareLoader(context, middleware, 1) })
})

/**
 * En: Export the Vue Router instance
 * Es: Exporta la instancia de Vue Router
 * @return VueRouter
 */
export default router
