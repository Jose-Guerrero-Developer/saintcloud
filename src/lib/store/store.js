import Vue  from 'vue'
import Vuex from 'vuex'

/**
 * En: Importing module configuration and constants
 * Es: Importando configuración de módulos y constantes
 */
import htmlClass      from './app/htmlclass'
import config         from './app/config'
import breadcrumbs    from './app/breadcrumb'
import { App        } from './app/app'
import { Auth       } from './auth/auth'
import { Profile    } from './profile/profile'
import { I18n       } from './i18n/i18n'
import {
  APP,
  AUTH,
  I18N,
  PROFILE } from './constants'

Vue.use(Vuex)

/**
 * En: Export Vuex instance
 * Es: Exporta la instancia de Vuex
 * @return Vuex
 */
export default new Vuex.Store({
  modules: {
    htmlClass,
    config,
    breadcrumbs,
    /**
     * En: Application module
     * Es: Módulo aplicación
     */
    [APP]: App,
    /**
     * En: Authentication module
     * Es: Módulo autentificación
     */
    [AUTH]: Auth,
    /**
     * En: Session profile module
     * Es: Módulo perfil de sesión
     */
    [PROFILE]: Profile,
    /**
     * En: Module i18n
     * Es: Módulo i18n
     */
    [I18N]: I18n,
  }
})
