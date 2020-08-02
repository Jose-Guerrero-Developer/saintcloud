<template>
  <div class = "d-flex flex-column flex-root">
    <!-- begin:: Header Mobile -->
    <KTHeaderMobile />
    <Loader v-if = "loaderEnabled" v-bind:logo = "loaderLogo" />
    <!-- begin::Body -->
    <div class = "d-flex flex-row flex-column-fluid page">
      <!-- begin:: Aside Left -->
      <KTAside v-if = "asideEnabled" />
      <div
        id    = "kt_wrapper"
        class = "d-flex flex-column flex-row-fluid wrapper">
        <!-- begin:: Header -->
        <KTHeader />
        <!-- begin:: Content -->
        <div
          id    = "kt_content"
          class = "content d-flex flex-column flex-column-fluid">
          <!-- begin:: Content Head -->
          <KTSubheader
            v-if               = "subheaderDisplay"
            v-bind:title       = "pageTitle"
            v-bind:breadcrumbs = "breadcrumbs" />
          <!-- begin:: Content Body -->
          <div class = "d-flex flex-column-fluid">
            <div
              :class = "{ 'container-fluid': contentFluid, container: !contentFluid }">
              <transition name = "fade-in-up">
                <router-view />
              </transition>
            </div>
          </div>
        </div>
        <KTFooter />
      </div>
    </div>
    <KTStickyToolbar v-if = "toolbarDisplay" />
    <KTScrollTop />
  </div>
</template>

<script>
import { mapGetters }   from 'vuex'
import KTAside          from '@/layouts/aside/Aside.vue'
import KTHeader         from '@/layouts/header/Header.vue'
import KTHeaderMobile   from '@/layouts/header/HeaderMobile.vue'
import KTFooter         from '@/layouts/footer/Footer.vue'
import HtmlClass        from '@/lib/store/htmlclass'
import KTSubheader      from '@/layouts/subheader/Subheader.vue'
import KTStickyToolbar  from '@/layouts/extras/StickyToolbar.vue'
import KTScrollTop      from '@/layouts/extras/ScrollTop'
import Loader           from '@/layouts/content/Loader.vue'
import {
  ADD_BODY_CLASSNAME,
  REMOVE_BODY_CLASSNAME
} from '@/lib/store/app/htmlclass'
export default { name: 'WrapperDashboard',
  components: {
    Loader,
    KTAside,
    KTHeader,
    KTFooter,
    KTSubheader,
    KTScrollTop,
    KTHeaderMobile,
    KTStickyToolbar
  },
  beforeMount() {
    this.$store.dispatch(ADD_BODY_CLASSNAME, 'page-loading')
    HtmlClass.init(this.layoutConfig())
  },
  mounted() {
    setTimeout(() => {
      this.$store.dispatch(REMOVE_BODY_CLASSNAME, 'page-loading')
    }, 2000)
  },
  methods: {},
  computed: {
    ...mapGetters([
      'pageTitle',
      'breadcrumbs',
      'layoutConfig'
    ]),
    /**
     * Check if the page loader is enabled
     * @returns {boolean}
     */
    loaderEnabled() {
      return !/false/.test(this.layoutConfig('loader.type'))
    },
    /**
     * Check if container width is fluid
     * @returns {boolean}
     */
    contentFluid() {
      return this.layoutConfig('content.width') === 'fluid'
    },
    /**
     * Page loader logo image using require() function
     * @returns {string}
     */
    loaderLogo() {
      return process.env.BASE_URL + this.layoutConfig('loader.logo')
    },
    /**
     * Check if the left aside menu is enabled
     * @returns {boolean}
     */
    asideEnabled() {
      return !!this.layoutConfig('aside.self.display')
    },
    /**
     * Set the right toolbar display
     * @returns {boolean}
     */
    toolbarDisplay() {
      return true
    },
    /**
     * Set the subheader display
     * @returns {boolean}
     */
    subheaderDisplay() {
      return !!this.layoutConfig('subheader.display')
    }
  }
}
</script>
