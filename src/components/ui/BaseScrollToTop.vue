<template>
  <button type="button" v-on:click="scrollToTop" class="scroll__button">
    <BaseIcon icon-name="scroll to top" width="24" height="24"
      ><IconArrowUp
    /></BaseIcon>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import BaseIcon from './BaseIcon.vue';
import IconArrowUp from '../icons/IconArrowUp.vue';

export default Vue.extend({
  name: 'BaseScrollToTop',
  components: {
    BaseIcon,
    IconArrowUp
  },
  methods: {
    scrollToTop() {
      console.log('Ciao');
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.scroll {
  &__button {
    background: $primary-color;
    border: 1px solid $primary-color;
    border-radius: 50%;
    height: 36px;
    width: 36px;

    & svg {
      display: inline-block;
      fill: $surface-color;
      margin: -2.8px;
      stroke: transparent;
      vertical-align: middle;
    }
  }
}
</style>
