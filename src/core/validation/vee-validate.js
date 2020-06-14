import Vue        from 'vue'
import * as rules from 'vee-validate/dist/rules'
import i18n       from '../i18n/i18n'
import {
  extend,
  ValidationProvider } from 'vee-validate'

/**
 * En: Record all validation rules
 * Es: Registrar todas las reglas de validaciones
 */
for (let [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation,
    message: (_, values) => i18n.t(`validations.${ rule }`, values)
  });
}

/**
 * En: Register component validation provider globally
 * Es: Registrar componente validation provider de forma global
 */
Vue.component('ValidationProvider', ValidationProvider)
