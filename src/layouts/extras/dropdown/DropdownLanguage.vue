<template>
  <ul class = "navi navi-hover py-4">
    <template v-for = "(item, i) in languages">
      <li
        :key  = "i"
        class = "navi-item">
        <a
          class            = "navi-link"
          append
          v-on:click       = "selectedLanguage(item.locale)"
          v-bind:data-lang = "item.locale">
          <span class = "symbol symbol-20 mr-3">
            <img :src = "`media/svg/flags/${ item.flag }`" alt="" />
          </span>
          <span
            class  = "navi-text"
            v-html = "$t(item.i18n)" />
        </a>
      </li>
    </template>
  </ul>
</template>

<script>
import { 
  mapGetters, mapActions } from 'vuex'
export default { name: 'KTDropdownLanguage',
  props: {
    hideDropdown: null
  },
  methods: {
    ...mapActions({
      'setLocale': 'i18n/set-locale'
    }),
    selectedLanguage(locale) {
      this.setLocale({ Vue: this, locale })
      this.hideDropdown()
    }
  },
  computed: {
    ...mapGetters({
      'languages': 'i18n/languages'
    })
  }
}
</script>
