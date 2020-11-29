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
  font-size: $body-size;
  font-weight: normal;
  color: $text-color;
  outline: none;
  padding: 10px;
  text-decoration: none;

  &:hover {
    border-bottom: 1px solid $primary-color;
  }
  &.router-link-exact-active {
    border-bottom: 1px solid $primary-color;
    color: $text-color;
  }
}
</style>
