<template>
  <div id="calendar">
    <TheHeader title="The advent calendar"
      ><h2 class="calendar__subheadline">{{ currentDate }}</h2></TheHeader
    >
    <CalendarWindows />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TheHeader from '../components/layout/TheHeader.vue';
import CalendarWindows from '../components/CalendarWindows.vue';

export default Vue.extend({
  name: 'Calendar',
  components: {
    TheHeader,
    CalendarWindows
  },
  computed: {
    currentDate(): string {
      return new Date().toLocaleDateString();
    }
  }
});
</script>

<style lang="scss" scoped>
#calendar {
  & .calendar__subheadline {
    font-size: $headline-2-size;
  }
}
</style>
