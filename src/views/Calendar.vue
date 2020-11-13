<template>
  <div id="calendar">
    <TheHeader title="Advent calendar" />
    <CalendarWindows />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TheHeader from '../components/TheHeader.vue';
import CalendarWindows from '../components/CalendarWindows.vue';

export default Vue.extend({
  name: 'Calendar',
  components: {
    TheHeader,
    CalendarWindows
  }
});
</script>
