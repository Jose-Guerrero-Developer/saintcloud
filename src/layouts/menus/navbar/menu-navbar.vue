<template>
  <b-navbar
    shadow
    wrapper-class  = "container">
    <template slot = "brand">
      <b-navbar-item
        :to  = "{ name: 'dashboard' }"
         tag = "router-link">
        <img :src = "require('@/assets/images/logo.svg')" />
        <span
          class  = "navbar-brand-title"
          v-html = "$t('application_name')" />
      </b-navbar-item>
    </template>
    <template slot = "end">
      <!-- <MenuSearch   /> -->
      <MenuLanguage /> <MenuAccount  />
    </template>
  </b-navbar>
</template>

<script>
// import MenuSearch   from '@/layouts/menus/search'
import MenuAccount  from '@/layouts/menus/account'
import MenuLanguage from '@/layouts/menus/language'
export default { name: 'menu-navbar',
  components: {
    /*MenuSearch,*/ MenuAccount, MenuLanguage
  }
}
</script>
