import Vue   from 'vue'
import Buefy from 'buefy'

/**
 * En: Importing base styles
 * Es: Importar estilos base
 */
import '@mdi/font/scss/materialdesignicons.scss'
import 'css-utils-padding/lib/padding.css'
import '@/assets/scss/custom.scss'

/**
 * En: Establish Buefy instance
 * Es: Establecer instancia de Buefy
 */
Vue.use(Buefy, {
  defaultUseHtml5Validation: false
})
