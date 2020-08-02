import Vue                      from 'vue'
import VueRouter                from 'vue-router'
import { RESET_LAYOUT_CONFIG  } from '@/lib/store/app/config'

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
import Login                    from '@/views/Login'
import SignOut                  from '@/views/SignOut'
import Error404                 from '@/views/Error404'
import Dashboard                from '@/views/Dashboard'
import WrapperAuth              from '@/layouts/container/WrapperAuth'
import ForgotPassword           from '@/views/ForgotPassword'
import WrapperDashboard         from '@/layouts/container/WrapperDashboard'

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
      { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { middleware: [ AuthMiddleware ] } }
    )
  },
  /**
   * En: Page request path not found
   * Es: Ruta de solicitud de página no encontrada
   */
  { path: '*', component: Error404 }
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

  $store.dispatch(RESET_LAYOUT_CONFIG);
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
  
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
