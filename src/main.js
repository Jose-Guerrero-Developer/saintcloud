import Vue    from 'vue'
import App    from './views/app.vue'
import i18n   from './core/i18n/i18n'
import store  from './core/store/store'
import router from './core/router/router'

/**
 * En: Importing style configuration files
 * Es: Importando ficheros de configuración de estilos
 */
import '@/assets/js/buefy'
import 'css-utils-padding/lib/padding.css'
import '@/assets/scss/styles.scss'

/**
 * En: Setting up Vue instances and configurations
 * Es: Estableciendo instancia de Vue y configuraciones
 */
Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
