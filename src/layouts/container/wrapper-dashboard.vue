<template>
  <div id = "wrapper-dashboard">
    <MenuNavbar />
    <section class = "u-px3 u-py3">
      <div class = "container">
        <div class = "columns">
          <div class = "column is-one-fifth">
            <b-menu>
              <MenuAside :items = "items" />
            </b-menu>
          </div>
          <div class = "column">
            <transition
              name         = "fade"
              mode         = "out-in"
              @beforeLeave = "beforeLeave"
              @enter       = "enter"
              @afterEnter  = "afterEnter">
              <router-view />
            </transition>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import items      from '@/configs/menus/aside'
import MenuAside  from '@/layouts/menus/aside'
import MenuNavbar from '@/layouts/menus/navbar'
export default { name: 'wrapper-dashboard',
  data: () => ({ 
    items 
  }),
  components: {
    MenuAside, MenuNavbar
  },
  methods: {
    /**
     * En: Transition before lifting
     * Es: Transición antes de levantar
     */
    beforeLeave(element) { this.prevHeight = getComputedStyle(element).height },
    /**
     * En: Transitioning at Item Entry
     * Es: Transición al entrar elemento
     */
    enter(element) {
      const { height }     = getComputedStyle(element)
      element.style.height = this.prevHeight
      setTimeout(() => element.style.height = height)
    },
    /**
     * En: Transition after Item Entry
     * Es: Transición después de entrar elemento
     */
    afterEnter(element) { element.style.height = 'auto' }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
}
</style>
