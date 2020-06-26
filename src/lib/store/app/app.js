import { 
  ROUTE_IS_RELOADED,
  LOAD_INITIAL_STATE,
  SET_ROUTE_IS_RELOADED,
  SET_LOAD_INITIAL_STATE } from '../constants'

/**
 * En: Application Module Management
 * Es: Gestión de módulo de la aplicación
 * @return {state, actions, mutations, getters}
 */
export const App = { namespaced: true,
  state: {
    routeIsReloaded: true 
  },
  actions: {
    /**
     * En: Set initial load configuration for store status
     * Es: Estable la configuración de carga inicial para el estado de la tienda
     * @param {*} commit
     * @param boolean status
     */
    [ROUTE_IS_RELOADED]: ({ commit }, status) => commit(SET_ROUTE_IS_RELOADED, status),
    /**
     * En: Sets the initial status load of the application
     * Es: Establece la cargar de estado inicial de la aplicación
     * @param {*} commit
     * @param {*} Vue
     */
    [LOAD_INITIAL_STATE]: ({ commit }, Vue) => {
      commit(SET_LOAD_INITIAL_STATE, Vue)
      commit(SET_ROUTE_IS_RELOADED, false)
    }
  },
  mutations: {
    /**
     * En: Set initial load configuration for store status
     * Es: Estable la configuración de carga inicial para el estado de la tienda
     * @param {*} state
     * @param boolean status
     */
    [SET_ROUTE_IS_RELOADED]: (state, status) => {
      state.routeIsReloaded = status
    },
    /**
     * En: Set initial load configuration for store status
     * Es: Estable la configuración de carga inicial para el estado de la tienda 
     * @param {*} state
     * @param {*} Vue
     */
    [SET_LOAD_INITIAL_STATE]: async (state, Vue) => {
      const {
        $store, $storage }    = Vue
      let auth                = $storage.get('auth')
      let profile             = $storage.get('profile')
      if (!auth)    { auth    = $store.getters[`auth/initial-state`   ] }
      if (!profile) { profile = $store.getters[`profile/initial-state`] }
      $store.dispatch('profile/initial', {
        Vue, properties: profile
      })
      $store.dispatch('auth/initial',{
        Vue, properties: auth
      })
    }
  },
  getters: {
    /**
     * En: Returns status if page has been reloaded
     * Es: Retorna el estado si la pagina ha sido recargada
     * @param {*} state
     * @return boolean
     */
    [ROUTE_IS_RELOADED]: state => state.routeIsReloaded
  }
}
