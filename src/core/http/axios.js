import Vue             from 'vue'
import axios           from 'axios'
import * as Httpstatus from 'http-status-codes'

/**
 * En: Setting up Axios instance configurations
 * Es: Estableciendo configuraciones de la instancia Axios
 */
let config = {
  baseURL:         process.env.VUE_APP_API_BASE_URL || '',
  timeout:         60 * 1000,
  withCredentials: false
}
const _axios = axios.create(config);
_axios.interceptors.request.use(
  function(config) { return config },
  function(error)  { return Promise.reject(error) }
)
_axios.interceptors.response.use(
  function(response) { return response },
  function(error)    { return Promise.reject(error) }
)
Plugin.install = function(Vue) { Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    $http: {
      get: () => _axios
    },
    $httpStatus: {
      get: () => Httpstatus
    }
  })
}

/**
 * En: Exporting Axios instance
 * Es: Exportando instancia Axios
 */
Vue.use(Plugin)
export default Plugin
