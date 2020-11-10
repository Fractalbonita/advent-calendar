<template>
  <div id="app">
    <TheHeader title="Advent calendar" />
    <CalendarDescription />
    <CalendarWindows />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TheHeader from './components/TheHeader.vue';
import CalendarDescription from './components/CalendarDescription.vue';
import CalendarWindows from './components/CalendarWindows.vue';

export default Vue.extend({
  name: 'App',
  components: {
    TheHeader,
    CalendarDescription,
    CalendarWindows
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
