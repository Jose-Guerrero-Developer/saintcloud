<template>
  <div
    class = "
      image-background
    "
  >
    <div
      class = "
        u-pt4
        columns
        is-mobile
        is-centered
      "
    >
      <div
        class = "
          column
          is-two-fifths-tablet
          is-one-third-desktop
          is-one-quarter-fullhd
          is-one-third-widescreen
          is-three-quarters-mobile
        "
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
        <div
          class = "
            field
          "
        >
          <div
            class = "
              control
              has-text-primary
              has-text-centered
            "
          >
            Copyright © 2020-2020 Saint Cloud Inc. {{ $t('all_rights_reserved') }}.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default { name: "wrapper-auth",
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
.image-background {
  background-image: url("../../assets/images/auth/wallpaper-auth.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #fff;
  height: 100%;
  width: 100%;
  display: inline-block;
}
</style>
