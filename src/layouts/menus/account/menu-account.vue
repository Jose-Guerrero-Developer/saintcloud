<template>
  <b-dropdown position="is-bottom-left" append-to-body aria-role="menu">
    <button
      type  = "button"
      slot  = "trigger"
      class = "navbar-item button is-text is-button-language">
      <b-icon icon="account-cog-outline" />
    </button>
    <b-dropdown-item custom aria-role="menuitem">
      <strong>José Alexander</strong>
    </b-dropdown-item>
    <hr class="dropdown-divider">
    <b-dropdown-item has-link aria-role="menuitem">
      <a href="https://google.com" target="_blank">
        <b-icon icon="link"></b-icon>
        Google (link)
      </a>
    </b-dropdown-item>
    <b-dropdown-item value="home" aria-role="menuitem">
      <b-icon icon="home"></b-icon>
      Home
    </b-dropdown-item>
    <b-dropdown-item value="products" aria-role="menuitem">
      <b-icon icon="cart"></b-icon>
      Products
    </b-dropdown-item>
    <b-dropdown-item value="blog" disabled aria-role="menuitem">
      <b-icon icon="book-open"></b-icon>
      Blog
    </b-dropdown-item>
    <hr class="dropdown-divider" aria-role="menuitem">
    <b-dropdown-item value="settings">
      <b-icon icon="settings"></b-icon>
      Settings
    </b-dropdown-item>
    <b-dropdown-item value="logout" aria-role="menuitem" @click="signOut">
      <b-icon icon="logout"></b-icon>
      Logout
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default { name: 'menu-account',
  methods: {
    /**
     * En: Close profile session
     * Es: Cerrar la sesión de perfil
     */
    async signOut() {
      const { $router } = this
      $router.push({ name: 'sign-out' })
    }
  }
}
</script>
