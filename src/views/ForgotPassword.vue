<template>
  <section>
    <h1 class="has-text-centered has-text-weight-light has-text-primary is-size-4 u-pt4">
      <img src="logo.svg" class="image is-64x64 auth-logo" />
      {{ $t('welcome') }} Saint Cloud v1.0
    </h1>
    <p class="has-text-centered is-size-6 u-pb3">Forgot password</p>
    <b-field>
      <b-input
        :placeholder="$t('email')"
        v-model="email"
        type="email"
        icon="email-outline"
        icon-right="close-circle"
        icon-right-clickable
        @icon-right-click="clearIconClick('email')"
      ></b-input>
    </b-field>
    <div class="field u-pb2">
      <div class="control has-text-right">
        <router-link :to="{ name: 'login' }">{{ $t('login') }}</router-link>
      </div>
    </div>
    <div class="field u-pb2">
      <p class="control">
        <button class="button is-primary is-fullwidth" v-on:click="login">Reset password</button>
      </p>
    </div>
  </section>
</template>

<script>
export default { name: "ForgotPassword",
  data: () => ({
    email:    '',
    password: ''
  }),
  methods: {
    login() {
      this.$router.push({ name: "dashboard" });
    },
    clearIconClick(input) {
      switch (input) {
        case "email":
          this.email = "";
          break;
        case "password":
          this.password = "";
          break;
      }
    }
  }
};
</script>
