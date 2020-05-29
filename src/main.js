import Vue    from 'vue'
import App    from './app/App.vue'
import i18n   from './app/i18n/i18n'
import store  from './app/store/store'
import router from './app/router/router'

import '@/app/layouts/buefy'
import 'css-utils-padding/lib/padding.css'
import '@/assets/styles.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
