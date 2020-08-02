<template>
  <section>
    <!--begin::Content header-->
    <div class = "position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
      <span
        class  = "font-weight-bold font-size-3 text-dark-60"
        v-html = "$t('dont_have_an_account_yet')" />
      <router-link
        :to    = "{ name: 'login' }"
        class  = "font-weight-bold font-size-3 ml-2"
        v-html = "$t('sign_up!')" />
    </div>
    <!--end::Content header-->
    <!--begin::Signin-->
    <div class   = "login-form login-signin">
      <div class = "text-center mb-10 mb-lg-20">
        <h3
          class  = "font-size-h1"
          v-html = "`${ $t('application_name') } ${ $t('application_version') }`"/>
        <p
          class  = "text-muted font-weight-semi-bold"
          v-html = "$t('enter_your_email_and_password')" />
      </div>
      <!--begin::Form-->
      <validation-observer ref = "form">
        <b-form
          class           = "form"
          @submit.prevent = "handlerCredentials">
          <div
            role  = "alert"
            class = "alert alert-info">
            <div class = "alert-text">
              Use account <strong>admin@demo.com</strong> and password
              <strong>demo</strong> to continue.
            </div>
          </div>
          <!-- Field email -->
          <b-form-group
            id        = "input-group-email"
            :label    = "$t('email')"
            label-for = "input-email">
            <validation-provider
              :name  = "$t('email').toLowerCase()"
              :rules = "{ required: true, email: true }"
              v-slot = "{ errors }">
              <b-form-input
                id      = "input-email"
                class   = "form-control form-control-solid h-auto py-5 px-6"
                type    = "email"
                name    = "input-email"
                v-model = "email" />
                <b-form-invalid-feedback
                  id     = "input-1-live-feedback"
                  :state = "!errors[0] ? true : false"
                  v-html = "errors[0]" />
            </validation-provider>
          </b-form-group>
          <!-- Field password -->
          <b-form-group
            id        = "input-group-password"
            :label    = "$t('password')"
            label-for = "input-password">
            <validation-provider
              :name  = "$t('password').toLowerCase()"
              :rules = "{ required: true }"
              v-slot = "{ errors }">
              <b-form-input
                id      = "input-password"
                class   = "form-control form-control-solid h-auto py-5 px-6"
                type    = "password"
                name    = "input-password"
                v-model = "password" />
                <b-form-invalid-feedback
                  id     = "input-1-live-feedback"
                  :state = "!errors[0] ? true : false"
                  v-html = "errors[0]" />
            </validation-provider>
          </b-form-group>
          <!--begin::Action-->
          <div class = "form-group d-flex flex-wrap justify-content-between align-items-center">
            <router-link
              id     = "kt_login_forgot"
              :to    = "{ name: 'forgot-password' }"
              class  = "text-dark-60 text-hover-primary my-3 mr-2"
              v-html = "$t('forgot_password')" />
            <button
              ref    = "kt_login_signin_submit"
              type   = "submit"
              class  = "btn btn-primary font-weight-bold px-9 py-4 my-3 font-size-3"
              v-html = "$t('login')" />
          </div>
          <!--end::Action-->
        </b-form>
      </validation-observer>
      <!--end::Form-->
    </div>
    <!--end::Signin-->
  </section>
</template>

<style lang="scss" scoped>
.spinner.spinner-right {
  padding-right: 3.5rem !important;
}
</style>

<script>
import { mapActions } from 'vuex'
export default { name: 'Login',
  data: () => ({
    email:    'jose.guerrero.carrizo@gmail.com',
    password: 'secret'
  }),
  methods: {
    /**
     * En: Importing Actions, Credentials Authentication Module
     * Es: Importando acciones, módulo de autentificación de credenciales
     */
    ...mapActions({
      signIn: 'auth/sign-in'
    }),
    /**
     * En: Cleaning the text boxes 
     * Es: Limpiar las cajas de texto
     * @param {string} input
     */
    async handlerClearText(input) {
      switch (input) {
        case 'email':    this.email    = ''; break;
        case 'password': this.password = ''; break;
      }
    },
    /**
     * En: Request access credentials (Establish a user session)
     * Es: Solicitar credenciales de acceso (Establece una sesión de usuario)
     */
    async handlerCredentials() {
      this.$refs.form.validate().then(success => {
        if (!success) {
          return
        }
        const submitButton = this.$refs['kt_login_signin_submit']
        submitButton.setAttribute('disabled', true)
        submitButton.classList.add('spinner', 'spinner-light', 'spinner-right')
        setTimeout(() => {
          const {
            $http,
            $router,
            $httpStatus } = this
          $http.post(`auth/login`, { 
            email: this.email, password: this.password
          })
          .then(authorization => { 
            const { status, data: credentials } = authorization
            if (status === $httpStatus.OK && this.signIn({ Vue: this, credentials })) {
              $router.push({ name: 'dashboard' })
            }
          }).catch(() => {
            this.$bvToast.toast(`${ this.$t('the_data_provided_as_credentials') }, ${ this.$t('are_not_valid') }`, {
              title: this.$t('authentication'),
              variant: 'danger',
              appendToast: true,
              autoHideDelay: 5000
            })
          })
          submitButton.classList.remove(
            'spinner',
            'spinner-light',
            'spinner-right'
          )
          submitButton.removeAttribute('disabled')
        }, 0.5 * 1000)
      })
    }
  }
}
</script>
