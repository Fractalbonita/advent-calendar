<template>
  <div class="header">
    <h1 class="header__title">{{ title }}</h1>
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TheHeader',
  props: {
    title: String
  }
});
</script>

<style lang="scss" scoped>
.header {
  text-align: center;

  &__title {
    color: $primary-color;
    font-family: 'Lobster';
    font-size: $headline-1-size;
    font-weight: bold;
    margin: 0.5rem 0 2.5rem 0;
  }
}
</style>
