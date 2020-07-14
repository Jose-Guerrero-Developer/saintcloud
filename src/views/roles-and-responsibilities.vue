<template>
  <div
    id = "roles-and-responsibilities"
  >
    <MenuBreadcrumb
      :items = "breadcrumb" />
  </div>
</template>

<script>
import MenuBreadcrumb from '@/layouts/menus/breadcrumb'
export default { name: 'roles-and-responsibilities',
  data: () => ({
    breadcrumb: [
      { i18n: 'roles_and_responsibilities', icon: 'translate', route: 'roles-and-responsibilities' },
      { i18n: 'administer', active: true }
    ]
  }),
  components: { MenuBreadcrumb }
}
</script>
