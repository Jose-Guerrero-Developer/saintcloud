import {
  LOAD,
  RESET,
  REBOOT,
  INITIAL } from '../constants'

/**
 * En: Session profile module management
 * Es: Gestión módulo de perfil de la sesión
 * @return {state, actions, mutations, getters}
 */
export const Profile = { namespaced: true,
  state: {
    id:          0,
    name:        '',
    email:       '',
    roles:       {},
    permissions: []
  },
  actions: {
    /**
     * En: Initialize the settings for the module
     * Es: Inicializar las configuraciones para el módulo
     * @param {*} commit
     * @param {Vue, properties}
     */
    [INITIAL]: ({ commit }, { Vue, properties }) => commit(LOAD, { Vue, properties }),
    /**
     * En: Reset all settings for the module
     * Es: Reiniciar todas la configuraciones para el módulo
     * @param {*} commit
     */
    [RESET]: ({ commit }) => commit(REBOOT)
  },
  mutations: {
    /**
     * En: Load the configurations for the module
     * Es: Cargar las configuraciones para el módulo
     * @param {*} state
     * @param {Vue, properties}
     */
    [LOAD]: (state, { Vue, properties }) => {
      const { $storage }  = Vue
      const { 
        id, name, email } = properties
      state.id    = id
      state.name  = name
      state.email = email
      $storage.set('profile', { id, name, email })
    },
    /**
     * En: Reset all settings for the module
     * Es: Reiniciar todas la configuraciones para el módulo
     * @param {*} state
     */
    [REBOOT]: (state) => {
      state.id          = 0,
      state.name        = '',
      state.email       = '',
      state.roles       = {},
      state.permissions = []
    }
  }
}
