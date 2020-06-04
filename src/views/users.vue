<template>
  <div id="users">
    <menu-breadcrumb :items="breadcrumb"></menu-breadcrumb>
  </div>
</template>

<script>
import menuBreadcrumb from '@/core/layouts/menus/breadcrumb/menu-breadcrumb'
export default {
  name: 'users',
  data() {
    return {
      breadcrumb: [
        { i18n: 'users', icon: 'account-supervisor-outline', route: 'users' },
        { i18n: 'administer', active: true }
      ]
    }
  },
  components: { menuBreadcrumb }
}
</script>
