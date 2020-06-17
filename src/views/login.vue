<template>
  <validation-observer
    ref = "form"
  >
    <!-- form auth credentials -->
    <form
      @submit.prevent = "handlerCredentials"
    >
      <h1 class = "
          u-pt4
          is-size-4
          has-text-primary
          has-text-centered
          has-text-weight-light"
      >
        <img
          :src  = "require('@/assets/images/logo.svg')"
          class = "image is-64x64 auth-logo" />
        {{ `${ $t('welcome') } ${ $t('application_name') } ${ $t('application_version') }` }}
      </h1>
      <p
        class  = "
          u-pb3
          is-size-6
          has-text-centered"
        v-html = "$t('sign_in_to_continue')" />
      <!-- Field email -->
      <validation-provider
        :name  = "$t('email').toLowerCase()"
        :rules = "{ required: true, email: true }"
        v-slot = "{ errors }"
      >
        <b-field
          :type    = "errors[0] ? 'is-danger' : ''"
          :message = "errors[0]"
        >
          <b-input
            type                = "email"
            icon                = "email-outline"
            v-model             = "email"
            icon-right          = "close-circle"
            :placeholder        = "$t('email')"
            @icon-right-click   = "handlerClearText('email')"
            icon-right-clickable />
        </b-field>
      </validation-provider>
      <!-- Field password -->
      <validation-provider
        :name  = "$t('password').toLowerCase()"
        :rules = "{ required: true }"
        v-slot = "{ errors }"
      >
        <b-field
          :type    = "errors[0] ? 'is-danger' : ''"
          :message = "errors[0]"
        >
          <b-input
            type                 = "password"
            icon                 = "form-textbox-password"
            v-model              = "password"
            icon-right           = "close-circle"
            :placeholder         = "$t('password')"
            @icon-right-click    = "handlerClearText('password')"
            icon-right-clickable />
        </b-field>
      </validation-provider>
      <!-- link forgot -->
      <b-field class = "
        u-pb2
        has-text-right"
      >
        <router-link
          :to    = "{ name: 'forgot-password' }"
          v-html = "$t('forgot_password')" />
      </b-field>
      <!-- button login -->
      <b-field
        class = "u-pb2"
      >
      <button
        type   = "submit"
        class  = "button is-primary is-fullwidth"
        v-html = "$t('login')" />
      </b-field>
    </form>
  </validation-observer>
</template>

<script>
import { mapActions } from 'vuex'
export default { name: 'login',
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
        const loading = this.$buefy.loading.open({ container: null })
        setTimeout(() => { loading.close()
          const {
            $http,
            $buefy,
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
            $buefy.notification.open({
              type:       'is-danger',
              duration:   3000,
              'has-icon': true,
              message:    `
                <h5
                  class = "is-size-6 has-text-weight-bold"
                >
                  ${ this.$t('authentication') }
                </h5>
                <p class = "is-size-6">${ this.$t('the_data_provided_as_credentials') }</p>
                <p class = "is-size-6">${ this.$t('are_not_valid') }</p>
              `
            })
          })
        }, 0.5 * 1000)
      })
    }
  }
}
</script>
