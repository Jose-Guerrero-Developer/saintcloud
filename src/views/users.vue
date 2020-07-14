<template>
  <div
    id = "users"
  >
    <MenuBreadcrumb
      :items = "breadcrumb" />
  </div>
</template>

<script>
import MenuBreadcrumb from '@/layouts/menus/breadcrumb'
export default { name: 'users',
  data: () => ({
    breadcrumb: [
      { i18n: 'users', icon: 'account-supervisor-outline', route: 'users' },
      { i18n: 'administer', active: true }
    ]
  }),
  components: { MenuBreadcrumb }
}
</script>
