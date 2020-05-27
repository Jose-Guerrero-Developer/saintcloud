<template>
  <section>
    <b-menu-list v-for="({ title, i18n, icon, route, submenu  }, index) of items" :key="index" :label="$t(title)">
      <template
        v-if="!submenu"
      >
        <b-menu-item icon="information-outline" label="Info"></b-menu-item>
      </template>
      <template
        v-else
      >
        <menu-aside></menu-aside>
      </template>
    </b-menu-list>
  </section>
</template>

<script>
export default {
  name: 'menu-aside',
  props: {
    items: Array
  },
  data() {
    return {
      isActive: true
    }
  }
};
</script>
