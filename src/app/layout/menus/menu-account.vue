<template>
  <b-dropdown position="is-bottom-left" append-to-body aria-role="menu">
    <a class="navbar-item" slot="trigger" role="button">
      <span>
        <b-icon icon="user-circle" pack="far" size="is-medium"></b-icon>
      </span>
    </a>
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
    <b-dropdown-item value="logout" aria-role="menuitem">
      <b-icon icon="logout"></b-icon>
      Logout
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  name: 'menu-account'
}
</script>
