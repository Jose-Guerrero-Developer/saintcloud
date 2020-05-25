<template>
  <div id="wrapper-dashboard">
    <menu-navbar></menu-navbar>
    <section class="u-px3 u-py1">
      <div class="container is-fluid ">
        <div class="columns">
          <div class="column is-2">
            <menu-aside></menu-aside>
          </div>
          <div class="column is-10">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script type="text/javascript">
import menuNavbar from '@/app/layout/menus/menu-navbar'
import menuAside  from '@/app/layout/menus/menu-aside'
export default {
  name: 'wrapper-dashboard',
  components: {
    menuNavbar,
    menuAside
  }
}
</script>
