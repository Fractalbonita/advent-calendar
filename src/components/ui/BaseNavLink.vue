<template>
  <router-link v-bind:to="link.path">{{ link.name }}</router-link>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseNavLink',
  props: {
    link: Object
  }
});
</script>

<style lang="scss" scoped>
a {
  font-weight: bold;
  color: $secondary-color;
  padding: 10px;
  text-decoration: none;

  &.router-link-exact-active {
    text-decoration: underline;
    color: $primary-color;
  }
}
</style>
