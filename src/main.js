import Vue    from 'vue'
import App    from './views/app.vue'
import i18n   from './core/i18n/i18n'
import store  from './core/store/store'
import router from './core/router/router'

import '@/assets/js/buefy'
import 'css-utils-padding/lib/padding.css'
import '@/assets/scss/styles.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
