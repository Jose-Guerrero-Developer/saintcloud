/**
 * En: Importing constant settings
 * Es: Importando configuración de constantes
 */
import Vue from 'vue'
import {
  locale, selected, languages,
  LOCALE,
  SET_LOCALE } from '../constants'

/**
 * En: Handler validate locale language state
 * Es: El manipulador valida el idioma local del estado
 * @return string
 */
const validateLocaleState = () => {
  const { $storage } = Vue
  let locale         = $storage.get('locale') || process.env.VUE_APP_I18N_LOCALE || 'en'
  switch ((locale).toString().toLowerCase()) {
    case 'en': break
    case 'es': break
    case 'fr': break
    default:
      locale = process.env.VUE_APP_I18N_LOCALE || 'en'
  }
  $storage.set('locale', locale)
  return locale
}

/**
 * En: Language module manager
 * Es: Gestor modulo de idiomas
 * @return {state, actions, mutations, getters}
 */
export const I18n = { namespaced: true,
  state: {
    locale: validateLocaleState(),
    languages: [
      { locale: 'es', i18n: 'spanish', flag: 'es.svg' },
      { locale: 'en', i18n: 'english', flag: 'us.svg' },
      { locale: 'fr', i18n: 'french',  flag: 'fr.svg' }
    ]
  },
  actions: {
    /**
     * En: Set the language change
     * Es: Estable el cambio de idioma
     * @param {*} commit
     * @param {Vue, locale} 
     */
    [SET_LOCALE]: ({ commit }, { Vue, locale }) => {
      commit(LOCALE, {Vue, locale})
    }
  },
  mutations: {
    /**
     * En: Set the language change
     * Es: Estable el cambio de idioma
     * @param {*} state 
     * @param {Vue, locale} 
     */
    [LOCALE]: ( state, { Vue, locale }) => {
      const {
        $i18n, $storage }  = Vue
      setTimeout(() => {
        $i18n.locale = locale
        state.locale = locale
        $storage.set('locale', locale)
      }, 0.5 * 1000)
    }
  },
  getters: {
    /**
     * En: Returns the current language set
     * Es: Retorna el idioma actual establecido
     * @param  {*} state
     * @return String
     */
    [locale]: state => state.locale,
    /**
     * En: Returns a matrix with the current language settings
     * Es: Retorna una matriz con las configuraciones de idiomas actual
     * @param  {*} state
     * @return Array
     */
    [languages]: state => state.languages,
    /**
     * En: Returns the currently selected language setting
     * Es: Retorna la configuración de idioma seleccionada actualmente
     * @param  {*} state
     * @return {locale, i18n, flag}
     */
    [selected]: state => {
      let selected = ''
      for (const { locale, i18n, flag } of state.languages) {
        if (state.locale === locale) {
          selected = { locale, i18n, flag }
          break
        }
      }
      return selected
    }
  }
}
