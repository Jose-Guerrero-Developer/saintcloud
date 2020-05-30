<template>
  <div id="languages">
    <menu-breadcrumb :items="breadcrumb"></menu-breadcrumb>
    <div class="columns is-multiline is-mobile">
      <list-languages
        v-for="({ locale, i18n, flag }, index) of languages" :key="index" v-bind="{ locale, i18n, flag }" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import menuBreadcrumb from '@/core/layouts/menus/breadcrumb/menu-breadcrumb'
import listLanguages  from '@/components/language/list-languages'
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
    menuBreadcrumb, listLanguages
  },
  computed: {
    ...mapGetters({ languages: 'i18n/languages' })
  }
}
</script>
