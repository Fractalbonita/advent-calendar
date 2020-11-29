<template>
  <div class="loading">
    <BaseIcon icon-name="loading" width="72" height="72" class="loading__icon"
      ><IconBeerMug
    /></BaseIcon>
    <h3 class="loading__title">Loading {{ title }}...</h3>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BaseIcon from './BaseIcon.vue';
import IconBeerMug from '../icons/IconBeerMug.vue';

export default Vue.extend({
  name: 'BaseLoading',
  components: {
    BaseIcon,
    IconBeerMug
  },
  props: {
    title: String
  }
});
</script>

<style lang="scss" scoped>
.loading {
  text-align: center;

  &__title {
    color: $text-color;
    font-size: $headline-3-size;
    font-weight: normal;
    margin: 0.5rem 0;
  }
  &__icon {
    fill: $primary-color;
    margin: 1rem 0;
    stroke: $text-color;
    -webkit-animation: rotation 2s infinite linear;
    animation: rotation 2s infinite linear;
    @-webkit-keyframes rotation {
      from {
        -webkit-transform: rotate(0deg);
      }
      to {
        -webkit-transform: rotate(359deg);
      }
    }
    @keyframes rotation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(359deg);
      }
    }
  }
}
</style>
