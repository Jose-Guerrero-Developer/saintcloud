<template>
  <section>
    <div v-for = "({ title, i18n, icon, route, submenu, actions  }, index) of items" :key = "index">
      <div v-if = "!isChild">
        <b-menu-list :label = "$t(title)">
          <!-- single item -->
          <b-menu-item
            v-if       = "(!submenu || submenu.length === 0) && (!actions || actions.length === 0)"
            :icon      = "icon"
            :label     = "$t(i18n)"
            v-on:click = "redirectRoute(route)" />
          <!-- single item with actions -->
          <b-menu-item
            :icon     = "icon"
            v-else-if = "actions && actions.length >= 1">
            <template slot = "label"> {{ $t(i18n) }}
              <b-dropdown
                class     = "is-pulled-right"
                position  = "is-bottom-left"
                aria-role = "list">
                <b-icon icon = "dots-vertical" slot = "trigger" />
                <b-dropdown-item
                  v-for      = "({ i18n, route }, index) of actions" :key = "index"
                  aria-role  = "listitem"
                  v-on:click = "redirectRoute(route)"
                >
                  {{ $t(i18n) }}
                </b-dropdown-item>
              </b-dropdown>
            </template>
          </b-menu-item>
          <!-- multiple item -->
          <b-menu-item v-else :icon = "icon">
            <template slot = "label" slot-scope = "props">
              {{ $t(i18n) }} <b-icon class = "is-pulled-right" :icon = "props.expanded ? 'menu-up' : 'menu-down'" />
            </template>
            <menu-aside :items = "submenu" :isChild = "true" />
          </b-menu-item>
        </b-menu-list>
      </div>
      <div v-else>
        <!-- single item -->
        <b-menu-item
          v-if       = "(!submenu || submenu.length === 0) && (!actions || actions.length === 0)"
          :icon      = "icon"
          :label     = "$t(i18n)"
          v-on:click = "redirectRoute(route)" />
        <!-- single item with actions -->
        <b-menu-item
          :icon     = "icon"
          v-else-if = "actions && actions.length >= 1">
          <template slot = "label"> {{ $t(i18n) }}
            <b-dropdown
              class     = "is-pulled-right"
              position  = "is-bottom-left"
              aria-role = "list">
              <b-icon icon = "dots-vertical" slot = "trigger" />
              <b-dropdown-item
                v-for      = "({ i18n, route }, index) of actions" :key = "index"
                aria-role  = "listitem"
                v-on:click = "redirectRoute(route)"
              >
                {{ $t(i18n) }}
              </b-dropdown-item>
            </b-dropdown>
          </template>
        </b-menu-item>
        <!-- multiple item -->
        <b-menu-item v-else :icon = "icon">
          <template slot = "label" slot-scope = "props">
            {{ $t(i18n) }} <b-icon class = "is-pulled-right" :icon = "props.expanded ? 'menu-up' : 'menu-down'" />
          </template>
          <menu-aside :items = "submenu" :isChild = "true" />
        </b-menu-item>
      </div>
    </div>
  </section>
</template>

<script>
export default { name:  'menu-aside',
  props: { items: Array, isChild: Boolean },
  data: () => ({ 
    isActive: true
  }),
  methods: {
    /**
     * En: Addressing to a specific route
     * Es: Direccionamiento a una ruta en especifico
     * @param  String route
     * @return Promise
     */
    async redirectRoute(route) {
      if (this.$route.name !== route) {
        this.$router.push({ name: route })
      }
    }
  }
};
</script>
