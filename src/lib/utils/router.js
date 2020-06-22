import Vue       from 'vue'
import VueRouter from 'vue-router'

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
      { path: '/', name: 'login', component: Login },
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
  const Vue = router.app
  const {
    name: currentRouting } = to
  const {
    $http,
    $i18n,
    $store,
    $buefy,
    $httpStatus } = Vue
  // En: Upload all local storage configurations to the Vuex store
  // Es: Cargar todas la configuraciones del local storage a la tienda de Vuex
  if ($store.getters['app/route-is-reloaded']) { $store.dispatch('app/load-inital-state', Vue) }
  $i18n.locale          = $store.getters['i18n/locale']
  const isActiveToken   = $store.getters['auth/is-active-token']
  const hasExpiredToken = $store.getters['auth/has-expired-token'](Vue)
  // En: Validate if there is an active session when you are in the login path
  // Es: Validar si existe una sesión activa cuando este en la ruta de inicio de sesión
  if (currentRouting === 'login' && isActiveToken) {
    $http.get('auth/is-valid-token')
      .then(({ status }) => {
        if (status === $httpStatus.OK) {
          router
            .push({ name: 'dashboard' })
        }
      })
      .catch(() => {
        $store
          .dispatch('auth/sign-out', Vue)
      })
  }
  // En: Validate if there is an active session and if you have the access permissions
  // Es: Validar si existe una sesión activa y si cuenta con los permisos de acceso
  if (currentRouting !== 'login' && isActiveToken) {
    $http.get('auth/is-valid-token')
      .catch(() => {
        $store
          .dispatch('auth/sign-out', Vue)
        router
          .push({ name: 'login' })
      })
  }
  // En: Validate if there is no session with login credentials
  // Es: Validar si no existe una sesión con credenciales de acceso
  if (currentRouting !== 'login' && !isActiveToken) {
    $store
      .dispatch('auth/sign-out', Vue)
      router
        .push({ name: 'login' }).catch(() => {
          router.push({ name: 'login' })
        })
  }
  // En: Validate if the session token expired
  // Es: Validar si el token de la sesión expiro
  if (isActiveToken && hasExpiredToken) {
    $http.post('auth/refresh')
      .then(authorization => { 
        const { status, data: credentials } = authorization
        if (status === $httpStatus.OK && !$store.dispatch('auth/sign-in', { Vue, credentials })) {
          $store
            .dispatch('auth/sign-out', Vue)
          router
            .push({ name: 'login' })
          throw new Error('Impossible to refresh the session token')
        }
      }).catch(() => {
        $buefy.notification.open({
          type:       'is-danger',
          duration:   3000,
          'has-icon': true,
          message:    `
            <h5
              class = "is-size-6 has-text-weight-bold"
            >
              ${ $i18n.t('authentication') }
            </h5>
            <p class = "is-size-6">${ $i18n.t('impossible_to_refresh_the_session_token') }</p>
          `
        })
      })
  }
  next()
})

/**
 * En: Export the Vue Router instance
 * Es: Exporta la instancia de Vue Router
 * @return VueRouter
 */
export default router
