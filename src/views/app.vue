<template>
  <div
    id = "app"
  >
    <transition
      name         = "fade"
      mode         = "out-in"
      @enter       = "enter"
      @afterEnter  = "afterEnter"
      @beforeLeave = "beforeLeave"
    >
      <router-view />
    </transition>
  </div>
</template>

<script>
export default { name: 'app',
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
    afterEnter(element) { element.style.height = '100%' }
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
