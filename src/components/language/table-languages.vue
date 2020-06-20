<template>
  <b-table
    :data      = "items"
    :narrowed  = "true"
    :bordered  = "true"
    :hoverable = "true"
    :paginated = "true">
    <template
      slot-scope = "props">
      <!-- column flag -->
      <b-table-column
         field = "flag"
         width = "10em"
         class = "a"
        :label = "$t('flag')">
        <template
          slot       = "header"
          slot-scope = "{ column }">
          <b-tooltip :label = "column.label">{{ column.label }}</b-tooltip>
        </template>
        <div class="media">
          <div class="media-content">
            <div class="content">
              <figure class="image is-24x24">
                <img :src="require(`@/assets/images/flags/${ props.row.flag }`)" />
              </figure>
            </div>
          </div>
        </div>
      </b-table-column>
      <!-- column languages -->
      <b-table-column
         field = "languages"
         width = "40em"
        :label = "$t('languages')">
        <template
          slot       = "header"
          slot-scope = "{ column }">
          <b-tooltip :label = "column.label">{{ column.label }}</b-tooltip>
        </template>
        {{ $t(props.row.i18n) }}
      </b-table-column>
      <!-- column status -->
      <b-table-column
         field = "selected"
         width = "20em"
        :label = "$t('status')">
        <template
          slot       = "header"
          slot-scope = "{ column }">
          <b-tooltip :label = "column.label">{{ column.label }}</b-tooltip>
        </template>
        <span
          v-if = "locale === props.row.locale">
          <b-icon
            icon = "check"
            type = "is-primary" />
        </span>
        <span
          v-else>
          <b-icon
            icon = "minus"
            type = "is-dark" />
        </span>
      </b-table-column>
      <!-- column actions -->
      <b-table-column
         field = "actions"
         width = "30em"
        :label = "$t('actions')">
        <template
          slot       = "header"
          slot-scope = "{ column }">
          <b-tooltip :label = "column.label">{{ column.label }}</b-tooltip>
        </template>
        <b-button
           type      = "is-link"
           size      = "is-small"
          v-on:click = "setI18n(props.row.locale)">
          {{ $t('set_language') }}
        </b-button>
      </b-table-column>
    </template>
  </b-table>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'table-languages',
  props: { items: Array },
  computed: {
    ...mapGetters({ locale: 'i18n/locale' })
  },
  methods: {
    /**
     * En: (Click event)  Swap languages in the application
     * Es: (Evento click) Intercambia los idiomas en la aplicación
     * @return Promise
     */
    async setI18n(locale) {
      this.$store.dispatch('i18n/set-locale', { Vue: this, locale })
    }
  }
}
</script>
