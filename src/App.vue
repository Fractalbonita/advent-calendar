<template>
  <div id="app">
    <TheNavigation />
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TheNavigation from './components/TheNavigation.vue';

export default Vue.extend({
  name: 'App',
  components: {
    TheNavigation
  }
});
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
