<template>
  <div v-if="backdrop" v-on:click="handleClick"></div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseBackdrop',
  props: {
    backdrop: Boolean,
    handleClick: Function
  }
});
</script>

<style lang="scss" scoped>
div {
  background-color: $background-color;
  height: 100vh;
  left: 0;
  opacity: 0.5;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 1000;
}
</style>
