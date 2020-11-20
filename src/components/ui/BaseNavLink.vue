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
  outline: none;
  padding: 10px;
  text-decoration: none;

  &:hover {
    color: $primary-color;
  }
  &.router-link-exact-active {
    text-decoration: underline;
    color: $primary-color;
  }
}
</style>
