<template>
  <div id="wrapper-dashboard">
    <menu-navbar></menu-navbar>
    <section class="u-px3 u-py1">
      <div class="container is-fluid">
        <div class="columns">
          <div class="column is-one-fifth">
            <b-menu>
              <menu-aside :items="items"></menu-aside>
            </b-menu>
          </div>
          <div class="column">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script type="text/javascript">
import items from '@/configs/menu-aside'
import menuNavbar from '@/core/layouts/menus/navbar/menu-navbar'
import menuAside  from '@/core/layouts/menus/aside/menu-aside'
export default {
  name: 'wrapper-dashboard',
  data() {
    return {
      items
    }
  },
  components: {
    menuNavbar,
    menuAside
  }
}
</script>
