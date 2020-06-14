<template>
  <div
    id = "roles-and-responsibilities"
  >
    <menu-breadcrumb
      :items = "breadcrumb" />
  </div>
</template>

<script>
import menuBreadcrumb from '@/core/layouts/menus/breadcrumb/menu-breadcrumb'
export default { name: 'roles-and-responsibilities',
  data: () => ({
    breadcrumb: [
      { i18n: 'roles_and_responsibilities', icon: 'translate', route: 'roles-and-responsibilities' },
      { i18n: 'administer', active: true }
    ]
  }),
  components: { menuBreadcrumb }
}
</script>
