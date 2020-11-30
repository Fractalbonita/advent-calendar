<template>
  <div id="calendar">
    <TheHeader title="The advent calendar">
      <h3 class="calendar__date">{{ currentDate }}</h3>
    </TheHeader>
    <CalendarWindows />
    <BaseScrollToTop />
    <TheFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TheHeader from '../components/layout/TheHeader.vue';
import CalendarWindows from '../components/CalendarWindows.vue';
import BaseScrollToTop from '../components/ui/BaseScrollToTop.vue';
import TheFooter from '../components/layout/TheFooter.vue';

export default Vue.extend({
  name: 'Calendar',
  components: {
    TheHeader,
    CalendarWindows,
    BaseScrollToTop,
    TheFooter
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
  padding: 20px;

  & .calendar__date {
    font-size: $headline-3-size;
    font-weight: normal;
    letter-spacing: 0.2rem;
    margin: 1rem 0 1.5rem;
  }
}
</style>
