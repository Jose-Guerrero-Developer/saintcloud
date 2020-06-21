<template>
  <b-dropdown position="is-bottom-left" v-model="locale" aria-role="list">
    <button class="button is-white" type="button" slot="trigger">
      <template v-if="locale === 'en'">
        <img src="@/assets/images/flags/us.svg" width="24" />
      </template>
      <template v-else-if="locale === 'es'">
        <img src="@/assets/images/flags/es.svg" width="24" />
      </template>
      <template v-else-if="locale === 'fr'">
        <img src="@/assets/images/flags/fr.svg" width="24" />
      </template>
    </button>
    <b-dropdown-item :value="'en'" aria-role="listitem" v-on:click="setI18n('en')">
      <div class="media">
        <img src="@/assets/images/flags/us.svg" class="media-left" width="24" />
        <div class="media-content">
          <h3>{{ $t('english') }}</h3>
          <small>{{ $t('set_language') }}</small>
        </div>
      </div>
    </b-dropdown-item>
    <b-dropdown-item :value="'es'" aria-role="listitem" v-on:click="setI18n('es')">
      <div class="media">
        <img src="@/assets/images/flags/es.svg" class="media-left" width="24" />
        <div class="media-content">
          <h3>{{ $t('spanish') }}</h3>
          <small>{{ $t('set_language') }}</small>
        </div>
      </div>
    </b-dropdown-item>
    <b-dropdown-item :value="'fr'" aria-role="listitem" v-on:click="setI18n('fr')">
      <div class="media">
        <img src="@/assets/images/flags/fr.svg" class="media-left" width="24" />
        <div class="media-content">
          <h3>{{ $t('french') }}</h3>
          <small>{{ $t('set_language') }}</small>
        </div>
      </div>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  name: 'menu-i18n',
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
