<template>
  <p>
    There are <span>{{ count }}</span> days until Christmas.
  </p>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Countdown',
  props: {
    count: Number
  }
});
</script>

<style lang="scss" scoped>
span {
  font-size: 1.125rem;
}
</style>
