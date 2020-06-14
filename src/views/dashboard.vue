<template>
  <div id="dashboard">
    <menu-breadcrumb
      :items="breadcrumb" />
  </div>
</template>

<script>
import menuBreadcrumb from '@/core/layouts/menus/breadcrumb/menu-breadcrumb'
export default { name: 'dashboard',
  components: { menuBreadcrumb },
  data: () => ({
    breadcrumb: [
      { i18n: 'dashboard', icon: 'view-dashboard-outline', route: 'dashboard' },
      { i18n: 'statistics', active: true }
    ]
  })
}
</script>
