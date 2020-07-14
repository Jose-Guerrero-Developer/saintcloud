<template>
  <b-dropdown
    v-model   = "locale"
    position  = "is-bottom-left"
    aria-role = "list">
    <button
      type  = "button"
      slot  = "trigger"
      class = "button is-text is-button-language">
      <template v-if      = "locale === 'en'"><img src = "@/assets/images/flags/us.svg" /></template>
      <template v-else-if = "locale === 'es'"><img src = "@/assets/images/flags/es.svg" /></template>
      <template v-else-if = "locale === 'fr'"><img src = "@/assets/images/flags/fr.svg" /></template>
    </button>
    <b-dropdown-item
      :value     = "'en'"
      aria-role  = "listitem"
      v-on:click = "setI18n('en')">
      <div class = "media">
        <img
          src   = "@/assets/images/flags/us.svg"
          class = "media-left flag-border-radius"
          width = "22" />
        <div class = "media-content">
          <h3    v-html = "$t('english')" />
          <small v-html = "$t('set_language')" />
        </div>
      </div>
    </b-dropdown-item>
    <b-dropdown-item
      :value     = "'es'"
      aria-role  = "listitem"
      v-on:click = "setI18n('es')">
      <div class = "media">
        <img
          src   = "@/assets/images/flags/es.svg"
          class = "media-left flag-border-radius"
          width = "22" />
        <div class = "media-content">
          <h3    v-html = "$t('spanish')"/>
          <small v-html = "$t('set_language')"/>
        </div>
      </div>
    </b-dropdown-item>
    <b-dropdown-item
      :value     = "'fr'"
      aria-role  = "listitem"
      v-on:click = "setI18n('fr')">
      <div class = "media">
        <img
          src   = "@/assets/images/flags/fr.svg"
          class = "media-left flag-border-radius"
          width = "22" />
        <div class = "media-content">
          <h3    v-html = "$t('french')"/>
          <small v-html = "$t('set_language')"/>
        </div>
      </div>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default { name: 'menu-language',
  data() {
    return { locale: this.$store.getters['i18n/locale'] }
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
};
</script>
