import Vue from 'vue'
import App from './views/app.vue'

/**
 * En: Set the instance with Vue Storage
 * Es: Establece la instancia con Vue Storage
 */
import '@/lib/store/vue-storage'

/**
 * En: Set the instance with I18n
 * Es: Establece la instancia con I18n
 */
import i18n from '@/lib/i18n/i18n'

/**
 * En: Set the instance with Vuex
 * Es: Establece la instancia con Vuex
 */
import store from '@/lib/store/store'

/**
 * En: Set the instance with Vue Router
 * Es: Establece la instancia con Vue Router
 */
import router from '@/lib/utils/router'

/**
 * En: Set the instance with Vee Validation
 * Es: Establece la instancia con Vee Validation
 */
import '@/lib/utils/vee-validate'

/**
 * En: Set the instance with Axios
 * Es: Establece la instancia con Axios
 */
import '@/lib/utils/axios'

/**
 * En: Set the instance with Moment
 * Es: Establece la instancia con Moment
 */
import '@/lib/utils/moment'

/**
 * En: Importing style configuration files
 * Es: Importando ficheros de configuración de estilos
 */
import '@/lib/buefy'

/**
 * En: Setting up Vue instances and configurations
 * Es: Estableciendo instancia de Vue y configuraciones
 */
Vue.config.productionTip = false
new Vue({
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
