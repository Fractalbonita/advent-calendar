<template>
  <nav class="nav">
    <ul class="nav__wrapper">
      <li v-for="link in links" v-bind:key="link.path" class="nav__link">
        <BaseNavLink v-bind:link="link" />
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
import BaseNavLink from '../ui/BaseNavLink.vue';

export default Vue.extend({
  name: 'TheNavigation',
  components: {
    BaseNavLink
  },
  data() {
    return {
      links: [
        {
          path: '/',
          name: 'Home'
        },
        {
          path: '/calendar',
          name: 'Calendar'
        },
        {
          path: '/beers',
          name: 'Beers'
        },
        {
          path: '/favourites',
          name: 'Favourites'
        }
      ]
    };
  }
});
</script>

<style lang="scss" scoped>
.nav {
  background-color: $background-color;
  display: flex;
  height: 56px;
  justify-content: space-evenly;
  position: sticky;
  top: 0;
  z-index: 1;

  &__wrapper {
    list-style: none;
    padding: 0;
  }

  &__link {
    display: inline-block;
  }
}
</style>
