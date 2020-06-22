<template>
  <div
    id    = "sign-out"
    class = "
      u-py2
      is-fluid
      container
    "
  >
    <div
      class = "columns"
    >
      <div
        class = "column"
      >
        {{ $t('expose_a_moment') }}...
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default { name: 'sign-out',
  beforeMount() {
    this.signOut()
  },
  computed: {
    ...mapGetters({ authIsActive: 'auth/is-active-token' })
  },
  methods: {
    /**
     * En: Close profile session
     * Es: Cerrar la sesión de perfil
     */
    async signOut() {
      const {
        $http,
        $store,
        $router,
        $httpStatus } = this
      if (!this.authIsActive) {
        return $router.push({ name: 'login' })
      }
      await $http.post('auth/logout').then(({ status }) => {
        if (status === $httpStatus.OK) {
          $store.dispatch('auth/sign-out', this)
          setTimeout(() => {
            $router.push({ name: 'login' })
          }, 800)
        }
      })
    }
  }
}
</script>
