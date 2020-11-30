<template>
  <div>
    <p v-if="count > 1" key="single-day" class="countdown">
      There are
      <span class="countdown__counter">- {{ count }} -</span>
      days until Christmas.
    </p>
    <p v-else-if="count === 1" key="multiple-days" class="countdown">
      There is
      <span class="countdown__counter">- {{ count }} -</span>
      day until Christmas.
    </p>
    <h2
      v-else-if="count === 0"
      key="christmas-day"
      class="countdown__christmas"
    >
      Merry <br />
      Christmas!
    </h2>
  </div>
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
.countdown {
  font-size: $body-size;
  font-weight: normal;
  line-height: 1.5;
  margin: 0.5rem 0;

  &__counter {
    color: $primary-color;
    display: block;
    font-family: 'Lobster';
    font-size: $headline-1-size;
    font-weight: bold;
    letter-spacing: 0.2rem;
  }
  &__christmas {
    color: $tertiary-color;
    font-family: 'Lobster';
    font-size: $headline-2-size;
    font-weight: bold;
    letter-spacing: 0.2rem;
    line-height: 2;
    margin: 0.5rem 0;
  }
}
</style>
