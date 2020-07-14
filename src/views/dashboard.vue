<template>
  <div id="dashboard">
    <MenuBreadcrumb
      :items="breadcrumb" />
  </div>
</template>

<script>
import MenuBreadcrumb from '@/layouts/menus/breadcrumb'
export default { name: 'dashboard',
  components: { MenuBreadcrumb },
  data: () => ({
    breadcrumb: [
      { i18n: 'dashboard', icon: 'view-dashboard-outline', route: 'dashboard' },
      { i18n: 'statistics', active: true }
    ]
  })
}
</script>
