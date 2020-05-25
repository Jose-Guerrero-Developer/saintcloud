<template>
  <div id="configurations">
    <menu-breadcrumb :items="breadcrumb"></menu-breadcrumb>
  </div>
</template>

<script>
import menuBreadcrumb from '@/app/layout/menus/menu-breadcrumb'
export default {
  name: 'configurations',
  data() {
    return {
      breadcrumb: [
        {
          i18n: 'configurations',
          icon: 'fas fa-cogs',
          route: 'configurations'
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
