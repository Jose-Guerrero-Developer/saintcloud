<template>
  <b-navbar
    wrapper-class = "container is-fluid"
  >
    <template
      slot = "brand"
    >
      <b-navbar-item
        :to = "{ name: 'dashboard' }"
        tag = "router-link"
      >
        <!-- logo application -->
        <img src = "@/assets/images/logo.svg" />
        <!-- brand application name -->
        <span
          class  = "navbar-brand-title"
          v-html = "$t('application_name')" />
      </b-navbar-item>
    </template>
    <template
      slot = "end"
    >
      <!-- menu search -->
      <menu-search  />
      <!-- menu i18n -->
      <menu-i18n    />
      <!-- menu account -->
      <menu-account />
    </template>
  </b-navbar>
</template>

<script>
import menuI18n    from '@/core/layouts/menus/language/menu-i18n'
import menuSearch  from '@/core/layouts/menus/search/menu-search'
import menuAccount from '@/core/layouts/menus/account/menu-account'
export default { name: 'menu-navbar',
  components: {
    menuI18n, menuAccount, menuSearch
  }
}
</script>
