import { 
  SIGN_IN,
  SET_CREDENTIALS } from '../constants'

/**
 * En: User authentication module management
 * Es: Gestión módulo de autentificación de usuarios
 * @return {state, actions, mutations, getters}
 */
export const Auth = { namespaced: true,
  state: {
    typeToken:     '',
    accessToken:   '',
    expiresIn:     0,
    signatureDate: ''
  },
  actions: {
    /**
     * En: Request access credentials
     * Es: Solicitar credenciales de acceso
     * @param {*} commit
     * @param {Vue, credentials}
     */
    [SIGN_IN]: ({ commit }, { Vue, credentials }) => commit(SET_CREDENTIALS, { Vue, credentials })  
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
        localStorage.setItem('credentials', JSON.stringify({ typeToken, accessToken, expiresIn, signatureDate }))
        $store.dispatch('profile/build', profile)
        $http
          .defaults
          .headers
          .common['Authorization'] = `${ typeToken } ${ accessToken }`
        transaction                = true
      } catch (error)              { transaction = false }
      return transaction
    }
  },
  getters: {

  }
}
