<template>
  <router-view />
</template>

<script>
import { OVERRIDE_LAYOUT_CONFIG } from '@/lib/store/app/config'
export default { name: 'App',
  mounted() {
    this.$store.dispatch(OVERRIDE_LAYOUT_CONFIG)
  }
};
</script>

<style lang="scss">
  @import "~bootstrap-vue/dist/bootstrap-vue.css";
  @import "~perfect-scrollbar/css/perfect-scrollbar.css";
  @import "~socicon/css/socicon.css";
  @import "~@fortawesome/fontawesome-free/css/all.css";
  @import "~line-awesome/dist/line-awesome/css/line-awesome.css";
  @import "../assets/plugins/flaticon/flaticon.css";
  @import "../assets/plugins/flaticon2/flaticon.css";
  @import "../assets/plugins/keenthemes-icons/font/ki.css";
  @import "@/assets/sass/style.vue.scss";
</style>
