<template>
  <div class="columns">
    <div class="column is-12">
      <nav class="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
        <ul>
          <li v-for="(item, index) of items" v-bind:key="index" v-bind:class="{ 'is-active': item.active }">
            <router-link :to="{ name: item.route }">
              <span class="icon is-small" v-if="!item.active">
                <b-icon :icon="item.icon" />
              </span>
              <span>{{ $t(item.i18n) }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menu-breadcrumb',
  props: {
    items: Array
  }
}
</script>
