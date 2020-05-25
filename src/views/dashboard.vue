<template>
  <div id="dashboard">
    <menu-breadcrumb :items="breadcrumb"></menu-breadcrumb>
  </div>
</template>

<script>
import menuBreadcrumb from '@/app/layout/menus/menu-breadcrumb'
export default {
  name: 'dashboard',
  data() {
    return {
      breadcrumb: [
        {
          i18n: 'dashboard',
          icon: 'fas fa-tachometer-alt',
          route: 'dashboard'
        },
        {
          i18n: 'statistics',
          icon: 'fas fa-home',
          active: true
        }
      ]
    }
  },
  components: {
    menuBreadcrumb
  }
}
</script>
