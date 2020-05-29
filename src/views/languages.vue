<template>
  <div id="languages">
    <menu-breadcrumb :items="breadcrumb"></menu-breadcrumb>
  </div>
</template>

<script>
import menuBreadcrumb from '@/app/layouts/menus/breadcrumb/menu-breadcrumb'
export default {
  name: 'languages',
  data() {
    return {
      breadcrumb: [
        {
          i18n: 'languages',
          icon: 'translate',
          route: 'languages'
        },
        {
          i18n: 'statistics',
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
