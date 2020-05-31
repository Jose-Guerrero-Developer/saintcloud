import Vue  from 'vue'
import Vuex from 'vuex'

/**
 * En: Importing module configuration and constants
 * Es: Importando configuración de módulos y constantes
 */
import { i18n       } from './i18n/i18n'
import { menuSearch } from './menus/menu-search'
import {
  I18n,
  MenuSearch } from './constants'

Vue.use(Vuex)

/**
 * En: Export Vuex instance
 * Es: Exporta la instancia de Vuex
 * @return Vuex
 */
export default new Vuex.Store({
  modules: {
    /**
     * En: Module i18n
     * Es: Modulo i18n
     */
    [I18n]: i18n,
    /**
     * En: Search menu module
     * Es: Modulo menú de búsqueda
     */
    [MenuSearch]: menuSearch
  }
})
