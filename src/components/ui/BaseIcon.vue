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
    <g v-bind:stroke="iconBorder" v-bind:fill="iconColor">
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
      default: 'box'
    },
    width: {
      type: [Number, String],
      default: 24
    },
    height: {
      type: [Number, String],
      default: 24
    },
    iconBorder: {
      type: String,
      default: 'currentColor'
    },
    iconColor: {
      type: String,
      default: 'currentColor'
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
