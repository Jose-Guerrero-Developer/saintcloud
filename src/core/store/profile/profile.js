import {
  BUILD,
  REBUILD } from '../constants'

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
     * En: Build user profile session
     * Es: Construir sesión del perfil de usuario
     * @param {*} commit
     * @param {*} profile
     */
    [BUILD]: ({ commit }, profile) => commit(REBUILD, profile)  
  },
  mutations: {
    /**
     * En: Set the user profile session
     * Es: Establecer la sesión del perfil de usuario
     * @param {*} state
     * @param {id, name, email}
     */
    [REBUILD]: (state, { id, name, email }) => {
      state.id    = id
      state.name  = name
      state.email = email
      localStorage.setItem('profile', JSON.stringify({ id, name, email }))
    }
  },
  getters: {

  }
}
