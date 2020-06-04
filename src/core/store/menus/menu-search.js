/**
 * En: Importing list of items for the search menu
 * Es: Importando de lista elementos para el menú de búsqueda
 */
import data from '@/configs/menus/search'
import {
  Items, Restore,
  RESTORE } from '../constants'

/**
 * En: Module manager search menu
 * Es: Gestor modulo menú de búsqueda
 * @return {state, actions, mutations, getters}
 */
export const menuSearch = { namespaced: true,
  state: {
    items: Array()
  },
  actions: {
    /**
     * En: Restores the list items from the search menu
     * Es: Restaura los elementos de la lista del menú de búsqueda
     * @param {*} commit
     * @param {*} vm
     */
    [Restore]: ({ commit }, vm) => commit(RESTORE, vm) 
  },
  mutations: {
    /**
     * En: Restores the list items from the search menu
     * Es: Restaura los elementos de la lista del menú de búsqueda
     * @param {*} state
     * @param {*} vm
     */
    [RESTORE]: (state, vm) => state.items = data.map(item => ({ name: vm.$t(item.name), icon: item.icon, route: item.route }))
  },
  getters: {
    /**
     * En: Returns the list items from the search menu
     * Es: Retorna los elementos de la lista del menú de búsqueda
     * @param  {*} state
     * @return Array
     */
    [Items]: state => state.items 
  }
}
