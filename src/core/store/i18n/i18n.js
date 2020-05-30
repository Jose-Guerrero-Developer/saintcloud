import {
  LOCALE,
  SET_LOCALE } from '../constants'

/**
 * En: Handler validate locale language state
 * Es: El manipulador valida el idioma local del estado
 * @return string
 */
const validateLocaleState = () => {
  let locale = localStorage.getItem('locale') || process.env.VUE_APP_I18N_LOCALE || 'en'
  switch ((locale).toString().toLowerCase()) {
    case 'en': break
    case 'es': break
    case 'fr': break
    default:
      locale = process.env.VUE_APP_I18N_LOCALE || 'en'
  }
  return locale
}

/**
 * En: Language module manager
 * Es: Gestor para modulo de idiomas
 * @return {state, actions, mutations, getters}
 */
export const i18n = { namespaced: true,
  state: {
    locale: validateLocaleState(),
    languages: [
      { locale: 'es', i18n: 'spanish', flag: 'es.svg' },
      { locale: 'en', i18n: 'english', flag: 'us.svg' },
      { locale: 'fr', i18n: 'french',  flag: 'fr.svg' }
    ]
  },
  actions: {
    [SET_LOCALE]({ commit }, { vm, locale }) {
      commit('LOCALE', {vm, locale})
    }
  },
  mutations: {
    [LOCALE]( state, { vm, locale }) {
      const loading   = vm.$buefy.loading.open({ container: null })
      setTimeout(() => {
        loading.close()
        vm.$i18n.locale = locale
        state.locale    = locale
        localStorage.setItem('locale', locale)
      }, 0.5 * 1000)
    }
  },
  getters: {
    locale:    state => state.locale,
    languages: state => state.languages,
    selected:  state => {
      let selected = ''
      state.languages.forEach(({ locale, i18n, flag }) => {
        if (locale === state.locale) {
          selected = { locale, i18n, flag}
        }
      })
      return selected
    }
  }
}
