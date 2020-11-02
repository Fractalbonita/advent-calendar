<template>
  <div id="app">
    <Header msg="Advent calendar" />
    <CalendarWindow />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from './components/Header.vue';
import CalendarWindow from './components/CalendarWindow.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Header,
    CalendarWindow
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
