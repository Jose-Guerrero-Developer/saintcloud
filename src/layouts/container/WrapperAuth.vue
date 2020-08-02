<template>
  <div class = "d-flex flex-column flex-root">
    <div
      id    = "kt_login"
      class = "login login-1 login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-white">
      <!--begin::Aside-->
      <div
        class  = "login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-15"
        :style = "{ backgroundImage: `url(${backgroundImage})` }">
        <!--begin: Aside Container -->
        <div class = "d-flex flex-row-fluid flex-column justify-content-between">
          <!--begin: Aside header -->
          <a href="#" class = "flex-column-auto">
            <img src = "media/logos/logo-letter-1.png" class="h-25" />
          </a>
          <!--begin: Aside content -->
          <div class  = "flex-column-fluid d-flex flex-column justify-content-center">
            <h3
              class  = "font-size-h1 mt-10 mb-5 text-white"
              v-html = "`Welcome to Metronic!`" />
            <p class = "font-weight-lighter text-white opacity-80">
              The ultimate Bootstrap, Angular 8, React &amp; VueJS admin theme
              framework for next generation web apps.
            </p>
          </div>
          <!--begin: Aside footer for desktop -->
          <div class = "d-none flex-column-auto d-lg-flex justify-content-between mt-15">
            <div
              class  = "opacity-70 font-weight-bold text-white"
              v-html = "`© 2020 Metronic`" />
            <div class = "d-flex">
              <a
                href   = "#"
                class  = "text-white"
                v-html = "`Privacy`" />
              <a
                href   = "#"
                class  = "text-white"
                v-html = "`Legal`" />
              <a
                href   = "#"
                class  = "text-white"
                v-html = "`Contact`" />
            </div>
          </div>
        </div>
      </div>
      <!--begin::Aside-->
      <!--begin::Content-->
      <div class   = "flex-row-fluid d-flex flex-column position-relative p-7 overflow-hidden">
        <div class = "d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default { name: 'WrapperAuth',
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    }),
    backgroundImage() {
      return process.env.BASE_URL + 'media/bg/bg-4.jpg'
    }
  }
};
</script>

<style lang="scss">
  @import "@/assets/sass/pages/login/login-1.scss";
</style>
