import Vue       from 'vue'
import VueRouter from 'vue-router'

/**
 * En: Importing components for routes
 * Es: Importación de componentes para las rutas
 */
import Login                    from '@/views/login'
import Users                    from '@/views/users'
import NotFound                 from '@/core/layouts/pages/not-found'
import Dashboard                from '@/views/dashboard'
import Languages                from '@/views/languages'
import WrapperDashboard         from '@/core/layouts/container/wrapper-dashboard'
import RolesAndResponsibilities from '@/views/roles-and-responsibilities'

Vue.use(VueRouter)

/**
 * En: Returns the route configuration
 * Es: Retorna la configuración de rutas
 * @return Array
 */
const routes = Array(
  /**
   * En: Login Path
   * Es: Ruta de inicio de sesión
   */
  { path: '/', name: 'login', component: Login },
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
      { path: '/dashboard', name: 'dashboard', component: Dashboard },
      /**
       * En: Language Route
       * Es: Ruta de idiomas
       */
      { path: '/languages', name: 'languages', component: Languages },
      /**
       * En: Users' route
       * Es: Ruta de usuarios
       */
      { path: '/users', name: 'users', component: Users },
      /**
       * En: Roles and permissions route
       * Es: Ruta de roles y permisos
       */
      { path: '/roles-and-responsibilities', name: 'roles-and-responsibilities', component: RolesAndResponsibilities }
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
 */
router.beforeEach((to, from, next) => {
  const { $i18n, $store } = router.app
  $i18n.locale = $store.getters['i18n/locale']
  next()
})

/**
 * En: Export the Vue Router instance
 * Es: Exporta la instancia de Vue Router
 * @return VueRouter
 */
export default router
