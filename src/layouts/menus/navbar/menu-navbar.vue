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
        <img :src = "require('@/assets/images/logo.svg')" />
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
import menuI18n    from '@/layouts/menus/language/menu-i18n'
import menuSearch  from '@/layouts/menus/search/menu-search'
import menuAccount from '@/layouts/menus/account/menu-account'
export default { name: 'menu-navbar',
  components: {
    menuI18n, menuAccount, menuSearch
  }
}
</script>
