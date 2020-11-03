<template>
  <div id="app">
    <TheHeader title="Advent calendar" />
    <CalendarDescription />
    <CalendarWindow />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TheHeader from './components/TheHeader.vue';
import CalendarDescription from './components/CalendarDescription.vue';
import CalendarWindow from './components/CalendarWindow.vue';

export default Vue.extend({
  name: 'App',
  components: {
    TheHeader,
    CalendarDescription,
    CalendarWindow
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
