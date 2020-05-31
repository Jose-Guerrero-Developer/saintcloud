<template>
  <section class="navbar-container-menu-search">
    <b-field>
      <b-autocomplete
         icon          = "magnify"
         v-model       = "name"
         field         = "name"
        :data          = "getItems"
        :placeholder   = "$t('search')"
        :keep-first    = "keepFirst"
        :open-on-focus = "openOnFocus"
         v-on:select   = "item => redirectRoutes(item)"
         rounded
         clearable>
        <template slot-scope = "props">
          <div class = "media">
            <div class = "media-left">
              <b-icon
                 size = "is-small"
                :icon = "props.option.icon" />
            </div>
            <div
              class  = "media-content"
              v-html = "props.option.name" />
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
      name:        '',
      keepFirst:   true,
      openOnFocus: true,
      selected:    null
    }
  },
  methods: {
    /**
     * En: Addressing to a specific route
     * Es: Direccionamiento a una ruta en especifico
     * @param  Object item
     * @return Promise
     */
    async redirectRoutes(item) {
      if (item && (item.route).toLowerCase() !== (this.$route.name).toLowerCase()) {
        this.$router.push({ name: item.route })
      }
    }
  },
  watch: {
    /**
     * En: Listen to the language changes
     * Es: Escucha los cambios de idioma
     */
    locale() { this.name = '' }
  },
  computed: {
    ...mapGetters({
      /**
       * En: Returns the currently set language
       * Es: Retorna el idioma establecido actualmente
       * @return String
       */
      locale: 'i18n/locale',
      /**
       * En: Returns the items in the search list
       * Es: Retorna los elementos de la lista de búsqueda
       * @return Array
       */
      items: 'menu-search/items'
    }),
    /**
     * En: Returns the search string if it matches an item in the search list
     * Es: Retorna la cadena de búsqueda si coincide con un elemento de la lista de búsqueda
     * @return String
     */
    getItems() {
      this.$store.dispatch('menu-search/restore', this)
      return this.items.filter(option => option.name
        .toString()
        .toLowerCase()
        .indexOf(this.name.toLowerCase()) >= 0
      )
    }
  }
}
</script>
