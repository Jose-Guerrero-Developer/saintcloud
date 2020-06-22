import Vue    from 'vue'
import moment from 'moment'

/**
 * En: Setting up configurations for the moment library
 * Es: Estableciendo configuraciones para la librería de moment
 */
moment.locale('es')
const Moment  = {
  install(Vue)  { Vue.moment = moment
    window.moment = moment
    Object.defineProperties(Vue.prototype, {
      $moment: { get: () => moment }
    })
  }
}

/**
 * En: Establishing the Moment con Vue instance
 * Es: Estableciendo la instancia de Moment con Vue
 */
Vue.use(Moment)
