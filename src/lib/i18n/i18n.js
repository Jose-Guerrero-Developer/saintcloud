import Vue          from 'vue'
import VueI18n      from 'vue-i18n'
import validationEn from 'vee-validate/dist/locale/en';
import validationEs from 'vee-validate/dist/locale/es';
import validationFr from 'vee-validate/dist/locale/fr';

Vue.use(VueI18n)

/**
 * En: Read the configuration files to set each language
 * Es: Lee los ficheros de configuraciones para establecer cada idioma
 * @return {locale}
 */
const load = () => {
  const locales  = require.context('./', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      let   validations = undefined
      const locale      = matched[1]
      switch (locale) {
        case 'en':
          validations = validationEn.messages
          break
        case 'es':
          validations = validationEs.messages
          break
        case 'fr':
          validations = validationFr.messages
          break
        default: 
          throw new Error('Set a language setting!')
      } 
      messages[locale] = Object.assign(locales(key), { validations })
    }
  })
  return messages
}

/**
 * En: Establishing i18n instance
 * Es: Estableciendo instancia i18n
 * @return VueI18n
 */
export default new VueI18n({
  locale:         process.env.VUE_APP_I18N_LOCALE          || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages:       load()
})
