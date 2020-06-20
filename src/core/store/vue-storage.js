import   Vue           from 'vue'
import { Vue2Storage } from 'vue2-storage'

/**
 * En: Set the instance with Vue Storage
 * Es: Establece la instancia con Vue Storage
 */
Vue.use(Vue2Storage, {
  prefix: 'app_',
  driver: 'local',
  ttl: 60 * 60 * 24 * 1000
})
