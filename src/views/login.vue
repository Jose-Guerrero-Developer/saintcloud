<template>
  <section>
    <h1 class = "
        u-pt4
        is-size-4
        has-text-primary
        has-text-centered
        has-text-weight-light"
    >
      <img
        src   = "logo.svg"
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
          required
          icon-right          = "close-circle"
          :placeholder        = "$t('email')"
          @icon-right-click   = "clearIconClick('email')"
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
          required
          icon-right           = "close-circle"
          :placeholder         = "$t('password')"
          @icon-right-click    = "clearIconClick('password')"
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
      <b-button
        type       = "is-primary"
        v-html     = "$t('login')"
        expanded
        v-on:click = "login" />
    </b-field>
  </section>
</template>

<script>
export default { name: 'login',
  data: () => ({
    email:    String(),
    password: String()
  }),
  methods: {
    /**
     * En: Cleaning the text boxes 
     * Es: Limpiar las cajas de texto
     * @param {string} input
     */
    clearIconClick(input) {
      switch (input) {
        case 'email':    this.email    = ''; break;
        case 'password': this.password = ''; break;
      }
    },
    /**
     * En: Request access credentials (Establish a user session)
     * Es: Solicitar credenciales de acceso (Establece una sesión de usuario)
     */
    login() {
      this.$router.push({ name: 'dashboard' });
    }
  }
}
</script>
