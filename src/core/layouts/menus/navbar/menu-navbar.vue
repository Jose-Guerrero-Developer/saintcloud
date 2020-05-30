<template>
  <b-navbar wrapper-class="container is-fluid">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ name: 'dashboard' }">
        <img
          src="@/assets/images/logo.svg"
          alt="Lightweight UI components for Vue.js based on Bulma"
        />
        <span class="navbar-brand-title">Saint Cloud</span>
      </b-navbar-item>
    </template>
    <template slot="end">
      <menu-search></menu-search>
      <menu-i18n></menu-i18n>
      <menu-account></menu-account>
    </template>
  </b-navbar>
</template>

<script>
import menuI18n    from '@/core/layouts/menus/language/menu-i18n'
import menuAccount from '@/core/layouts/menus/account/menu-account'
import menuSearch  from '@/core/layouts/menus/search/menu-search'
export default {
  name: 'menu-navbar',
  components: {
    menuI18n,
    menuAccount,
    menuSearch
  }
}
</script>
