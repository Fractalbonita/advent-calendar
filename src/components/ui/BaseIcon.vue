<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    v-bind:width="width"
    v-bind:height="height"
    viewBox="0 0 24 24"
    v-bind:aria-labelledby="iconName"
    role="presentation"
  >
    <title v-bind:id="iconName" lang="en">{{ iconName }} icon</title>
    <g>
      <slot />
    </g>
  </svg>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseIcon',
  props: {
    iconName: {
      type: String,
      default: 'box',
      required: true
    },
    width: {
      type: [Number, String],
      default: 24,
      required: true
    },
    height: {
      type: [Number, String],
      default: 24,
      required: true
    }
  }
});
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
  margin-left: -0.8px;
}
</style>
