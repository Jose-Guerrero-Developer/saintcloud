import Vue            from 'vue'
import Vuex           from 'vuex'
import { i18n       } from './i18n/i18n'
import { menuSearch } from './menus/menu-search'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    i18n,
    'menu-search': menuSearch
  }
})
