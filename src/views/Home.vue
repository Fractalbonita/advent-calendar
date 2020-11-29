<template>
  <div id="home">
    <TheHeader title="The 24 Beers of Christmas Advent Calendar" />
    <CalendarDescription />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TheHeader from '../components/layout/TheHeader.vue';
import CalendarDescription from '../components/CalendarDescription.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    TheHeader,
    CalendarDescription
  }
});
</script>

<style lang="scss" scoped>
#home {
  padding: 20px;
}
</style>
