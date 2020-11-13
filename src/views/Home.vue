<template>
  <div class="home">
    <TheHeader title="Advent calendar" />
    <CalendarDescription />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TheHeader from '../components/TheHeader.vue';
import CalendarDescription from '../components/CalendarDescription.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    TheHeader,
    CalendarDescription
  }
});
</script>
