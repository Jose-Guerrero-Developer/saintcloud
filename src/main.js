import Vue from 'vue'
import App from '@/views/App'

import 'popper.js'
import 'tooltip.js'
import PerfectScrollbar from 'perfect-scrollbar'
window.PerfectScrollbar = PerfectScrollbar
import ClipboardJS      from 'clipboard'
window.ClipboardJS      = ClipboardJS

import '@/core/plugins/portal-vue'
import '@/core/plugins/bootstrap-vue'
import '@/core/plugins/perfect-scrollbar'
import '@/core/plugins/highlight-js'
import '@/core/plugins/inline-svg'
import '@/core/plugins/apexcharts'
import '@/core/plugins/metronic'
import '@mdi/font/css/materialdesignicons.css'

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
import router from '@/routes/router'

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
