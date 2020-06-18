import { 
  SIGN_IN,
  SIGN_OUT,
  is_active,
  SET_CREDENTIALS,
  DELETE_CREDENTIALS } from '../constants'

/**
 * En: User authentication module management
 * Es: Gestión módulo de autentificación de usuarios
 * @return {state, actions, mutations, getters}
 */
export const Auth = { namespaced: true,
  state: {
    typeToken:     '',
    accessToken:   '',
    expiresIn:     '',
    signatureDate: '',
    isActive:      false
  },
  actions: {
    /**
     * En: Request access credentials
     * Es: Solicitar credenciales de acceso
     * @param {*} commit
     * @param {Vue, credentials}
     */
    [SIGN_IN]: ({ commit }, { Vue, credentials }) => commit(SET_CREDENTIALS, { Vue, credentials }),
    /**
     * En: Close the open profile session
     * Es: Cerrar la sesión de perfil abierta
     * @param {*} commit
     */
    [SIGN_OUT]: ({ commit }) => commit(DELETE_CREDENTIALS)
  },
  mutations: {
    /**
     * En: Establish access credentials
     * Es: Estable las credenciales de acceso
     * @param {*} state
     * @param {Vue, credentials}
     */
    [SET_CREDENTIALS]: (state, { Vue, credentials }) => {
      const { $http, $store } = Vue
      const {
        token_type:   typeToken,
        access_token: accessToken,
        expires_in:   expiresIn,
        profile                    } = credentials
      let transaction       = undefined
      const signatureDate   = Date.now()
      try {
        state.typeToken     = typeToken
        state.accessToken   = accessToken
        state.expiresIn     = expiresIn
        state.signatureDate = signatureDate
        state.isActive      = true
        localStorage.setItem('credentials', JSON.stringify({ typeToken, accessToken, expiresIn, signatureDate }))
        $store.dispatch('profile/build', profile)
        $http
          .defaults
          .headers
          .common['Authorization'] = `${ typeToken } ${ accessToken }`
        transaction                = true
      } catch (error)              { transaction = false }
      return transaction
    },
    /**
     * En: Delete open session data
     * Es: Eliminar los datos de sesión abierta
     * @param {*} state
     */
    [DELETE_CREDENTIALS]: (state) => {
      state.typeToken     = ''
      state.accessToken   = ''
      state.expiresIn     = ''
      state.signatureDate = ''
      state.isActive      = false
      localStorage.setItem('profile', JSON.stringify({}))
      localStorage.setItem('credentials', JSON.stringify({})) 
    }
  },
  getters: {
    /**
     * En: Returns profile session status
     * Es: Retorna el estado de la sesión de perfil
     * @param {*} state
     * @return boolean
     */
    [is_active]: state => state.isActive 
  }
}
