import data from '@/configs/menu-search'

/**
 * En:
 * Es:
 * @return {state, actions, mutations, getters}
 */
export const menuSearch = { namespaced: true,
  state: {
    items: []
  },
  actions: {
    restore: ({ commit }, vm) => commit('RESTORE', vm) 
  },
  mutations: {
    RESTORE(state, vm) {
      state.items = data.map(item => ({ name: vm.$t(item.name), route: item.route }))
    }
  },
  getters: {
    items: state => state.items 
  }
}
