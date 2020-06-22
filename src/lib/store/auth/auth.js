import {
  LOAD,
  INITIAL,
  SIGN_IN,
  SIGN_OUT,
  IS_ACTIVE_TOKEN,
  SET_CREDENTIALS,
  HAS_EXPIRED_TOKEN,
  DELETE_CREDENTIALS } from '../constants'

/**
 * En: User authentication module management
 * Es: Gestión módulo de autentificación de usuarios
 * @return {state, actions, mutations, getters}
 */
export const Auth = { namespaced: true,
  state: {
    typeToken:       '',
    accessToken:     '',
    expiresIn:       '',
    signatureDate:   '',
    expireSignature: '',
    isActive:        false
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
     * @param {*} Vue
     */
    [SIGN_OUT]: ({ commit }, Vue) => commit(DELETE_CREDENTIALS, Vue)
  },
  mutations: {
    /**
     * En: Load the configurations for the module
     * Es: Cargar las configuraciones para el módulo
     * @param {*} state
     * @param {Vue, properties}
     */
    [LOAD]: (state, { Vue, properties }) => {
      const {
        $http, $storage } = Vue
      const {
        typeToken,
        accessToken,
        expiresIn,
        signatureDate,
        expireSignature,
        isActive        }   = properties
      state.typeToken       = typeToken
      state.accessToken     = accessToken
      state.expiresIn       = expiresIn
      state.signatureDate   = signatureDate
      state.expireSignature = expireSignature
      state.isActive        = isActive
      $storage.set('auth', { typeToken, accessToken, expiresIn, signatureDate, expireSignature, isActive })
      $http
        .defaults
        .headers
        .common['Authorization'] = `${ typeToken } ${ accessToken }`
    },
    /**
     * En: Establish access credentials
     * Es: Estable las credenciales de acceso
     * @param {*} state
     * @param {Vue, credentials}
     */
    [SET_CREDENTIALS]: (state, { Vue, credentials }) => {
      const {
        $http,
        $store, $moment, $storage   } = Vue
      const {
        token_type:   typeToken,
        access_token: accessToken,
        expires_in:   expiresIn,
        profile                     } = credentials
      let transaction       = undefined
      const now             = $moment
      const expiredAlert    = (expiresIn - ((expiresIn / 4) * 3))
      const signatureDate   = now().format('x')
      const expireSignature = now().add((expiresIn - expiredAlert), 's').format('x')
      const isActive        = true
      try {
        state.typeToken       = typeToken
        state.accessToken     = accessToken
        state.expiresIn       = expiresIn
        state.signatureDate   = signatureDate
        state.expireSignature = expireSignature
        state.isActive        = isActive
        $storage
          .set('auth', { typeToken, accessToken, expiresIn, signatureDate, expireSignature, isActive })
        $store
          .dispatch('profile/initial', { Vue, properties: profile })
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
     * @param {*} Vue
     */
    [DELETE_CREDENTIALS]: (state, Vue) => {
      const { 
        $store, $storage }  = Vue
      state.typeToken       = ''
      state.accessToken     = ''
      state.expiresIn       = ''
      state.signatureDate   = ''
      state.expireSignature = ''
      state.isActive        = false
      $store
        .dispatch('profile/reset')
      $storage.remove('auth') 
      $storage.remove('profile')
    }
  },
  getters: {
    /**
     * En: Returns profile session status
     * Es: Retorna el estado de la sesión de perfil
     * @param {*} state
     * @return boolean
     */
    [IS_ACTIVE_TOKEN]: state => state.isActive,
    /**
     * En: Get if the session token has expired
     * Es: Obtener si ha caducado el token de la sesión
     * @param {*} state
     * @return boolean
     */
    [HAS_EXPIRED_TOKEN]: (state) => (Vue) => {
      const { 
        $moment } = Vue
      const now   = $moment().format('x')
      return ((state.expireSignature - now) <= 0) ? true : false
    }
  }
}
