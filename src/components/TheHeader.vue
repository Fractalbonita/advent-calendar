<template>
  <div class="header">
    <h1 class="header__title">{{ title }}</h1>
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

<style scoped lang="scss">
.header__title {
  font-size: $headline-1-size;
  margin: 0.5rem;
}
</style>
