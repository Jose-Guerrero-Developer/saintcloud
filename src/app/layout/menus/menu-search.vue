<template>
  <section class="navbar-container-menu-search">
    <b-field>
      <b-autocomplete
        icon          ="magnify"
        v-model       ="name"
        :data         ="getItems"
        field         ="name"
        :placeholder  ="$t('search')"
        :keep-first   ="keepFirst"
        :open-on-focus="openOnFocus"
        @select       ="item => redirectRoutes(item)"
        clearable
      >
        <template slot-scope="props">
          <div class="media">
            <div class="media-left">
              <b-icon icon="map-marker-alt" pack="fas" size="is-small" />
            </div>
            <div class="media-content">
              {{ props.option.name }}
            </div>
          </div>
        </template>
      </b-autocomplete>
    </b-field>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      name       : '',
      keepFirst  : true,
      openOnFocus: true,
      selected   : null
    }
  },
  methods: {
    async redirectRoutes(item) {
      if (item && (item.route).toLowerCase() !== (this.$route.name).toLowerCase()) {
        this.$router.push({ name: item.route })
      }
    }
  },
  watch: {
    locale() { this.name = '' }
  },
  computed: {
    ...mapGetters({ locale: 'i18n/locale', items: 'menu-search/items'}),
    getItems() {
      this.$store.dispatch('menu-search/restore', this)
      return this.items.filter((option) => {
        return option.name
          .toString()
          .toLowerCase()
          .indexOf(this.name.toLowerCase()) >= 0
      })
    }
  }
}
</script>
