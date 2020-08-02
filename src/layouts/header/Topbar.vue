<template>
  <div class = "topbar">
    <!--begin: Search -->
    <b-dropdown
      id           = "kt_quick_search_toggle"
      size         = "sm"
      right
      variant      = "link"
      no-caret
      no-flip
      toggle-class = "topbar-item text-decoration-none">
      <template v-slot:button-content>
        <div class = "btn btn-icon btn-clean btn-lg btn-dropdown mr-1">
          <span class = "svg-icon svg-icon-xl svg-icon-primary">
            <inline-svg src = "media/svg/icons/General/Search.svg" />
          </span>
        </div>
      </template>
      <b-dropdown-text
        tag   = "div"
        class = "min-w-md-350px">
        <KTSearchDefault />
      </b-dropdown-text>
    </b-dropdown>
    <!--begin: Notifications -->
    <b-dropdown
      size         = "sm"
      right
      variant      = "link"
      no-flip
      no-caret
      toggle-class = "topbar-item text-decoration-none">
      <template v-slot:button-content>
        <div class = "btn btn-icon btn-clean btn-dropdown btn-lg mr-1 pulse pulse-primary">
          <span class = "svg-icon svg-icon-xl svg-icon-primary">
            <inline-svg src = "media/svg/icons/Code/Compiling.svg" />
          </span>
          <span class = "pulse-ring" />
        </div>
      </template>
      <b-dropdown-text
        tag   = "div"
        class = "min-w-md-350px">
        <form>
          <KTDropdownNotification />
        </form>
      </b-dropdown-text>
    </b-dropdown>
    <!--begin: Quick Actions -->
    <b-dropdown
      size         = "sm"
      right
      variant      =  "link"
      no-flip
      no-caret
      toggle-class = "topbar-item text-decoration-none">
      <template v-slot:button-content>
        <div class = "btn btn-icon btn-clean btn-dropdown btn-lg mr-1">
          <span class = "svg-icon svg-icon-xl svg-icon-primary">
            <inline-svg src = "media/svg/icons/Media/Equalizer.svg" />
          </span>
        </div>
      </template>
      <b-dropdown-text
        tag   = "div"
        class = "min-w-md-350px">
        <KTDropdownQuickAction />
      </b-dropdown-text>
    </b-dropdown>
    <!--begin: My Cart -->
    <b-dropdown
      size         = "sm"
      right
      variant      = "link"
      no-flip
      no-caret
      toggle-class = "topbar-item text-decoration-none">
      <template v-slot:button-content>
        <div class = "btn btn-icon btn-clean btn-dropdown btn-lg mr-1">
          <span class = "svg-icon svg-icon-xl svg-icon-primary">
            <inline-svg src = "media/svg/icons/Shopping/Cart3.svg" />
          </span>
        </div>
      </template>
      <b-dropdown-text
        tag   = "div"
        class = "min-w-md-350px">
        <KTDropdownMyCart />
      </b-dropdown-text>
    </b-dropdown>
    <!--begin: Quick panel toggle -->
    <KTQuickPanel />
    <!--begin: Language bar -->
    <div class = "topbar-item">
      <b-dropdown
        id           = "topbar-languages-dropdown"
        ref          = "topbar-languages-dropdown"
        size         = "sm"
        right
        variant      = "link"
        no-flip
        no-caret
        toggle-class = "btn btn-icon btn-clean btn-dropdown btn-lg mr-1 text-decoration-none">
        <template v-slot:button-content>
          <img
            alt   = ""
            :src  = "`media/svg/flags/${ selected.flag }`"
            class = "h-20px w-20px rounded-sm" />
        </template>
        <b-dropdown-text
          tag   = "div"
          class = "min-w-md-175px">
          <KTDropdownLanguage
            :hideDropdown = "hideDropdown" />
        </b-dropdown-text>
      </b-dropdown>
    </div>
    <KTQuickUser />
  </div>
</template>

<script>
import KTQuickUser            from '@/layouts/extras/offcanvas/QuickUser.vue'
import KTQuickPanel           from '@/layouts/extras/offcanvas/QuickPanel.vue'
import { mapGetters }         from 'vuex'
import KTSearchDefault        from '@/layouts/extras/dropdown/SearchDefault.vue'
import KTDropdownMyCart       from '@/layouts/extras/dropdown/DropdownMyCart.vue'
import KTDropdownLanguage     from '@/layouts/extras/dropdown/DropdownLanguage.vue'
import KTDropdownQuickAction  from '@/layouts/extras/dropdown/DropdownQuickAction.vue'
import KTDropdownNotification from '@/layouts/extras/dropdown/DropdownNotification.vue'
export default { name: "KTTopbar",
  data: () => ({
    languageFlag: ''
  }),
  components: {
    KTQuickUser,
    KTQuickPanel,
    KTSearchDefault,
    KTDropdownMyCart,
    KTDropdownLanguage,
    KTDropdownQuickAction,
    KTDropdownNotification
  },
  methods: {
    hideDropdown() {
      const dropdown = this.$refs['topbar-languages-dropdown']
      dropdown.hide()
    }
  },
  computed: {
    ...mapGetters({
      'locale': 'i18n/locale', 'languages': 'i18n/languages', 'selected': 'i18n/selected'
    })
  }
};
</script>

<style lang = "scss">
.topbar {
  .dropdown-toggle {
    padding: 0;
    &:hover {
      text-decoration: none;
    }
    &.dropdown-toggle-no-caret {
      &:after {
        content: none;
      }
    }
  }
  .dropdown-menu {
    margin: 0;
    padding: 0;
    outline: none;
    .b-dropdown-text {
      padding: 0;
    }
  }
}
</style>
