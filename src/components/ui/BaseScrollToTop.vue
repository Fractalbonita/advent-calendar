<template>
  <button
    type="button"
    v-show="visible"
    v-on:click="scrollToTop"
    class="scroll__button"
  >
    <BaseIcon icon-name="scroll to top" width="24" height="24">
      <IconArrowUp />
    </BaseIcon>
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
  data() {
    return {
      visible: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.scrollListener);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollListener);
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    },
    scrollListener() {
      this.visible = window.scrollY > 150;
    }
  }
});
</script>

<style lang="scss" scoped>
.scroll {
  &__button {
    background-color: $primary-color;
    border: 1px solid $primary-color;
    border-radius: 50%;
    bottom: 20px;
    box-shadow: 0 2px 8px $shadow-color;
    cursor: pointer;
    height: 36px;
    outline: none;
    position: fixed;
    right: 20px;
    transition: 1.5s all cubic-bezier(0.39, 0.575, 0.565, 1);
    width: 36px;

    & svg {
      display: inline-block;
      fill: $text-color;
      margin: -2.8px;
      stroke: transparent;
      vertical-align: middle;
    }
  }
}
</style>
