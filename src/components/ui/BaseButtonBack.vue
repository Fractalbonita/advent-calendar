<template>
  <button typ="button" v-on:click="goBack" class="button">
    <BaseIcon
      icon-name="back"
      width="18"
      height="18"
      aria-hidden="true"
      class="button__icon"
    >
      <IconArrowBack />
    </BaseIcon>
    <span class="button__name">Go back</span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import BaseIcon from './BaseIcon.vue';
import IconArrowBack from '../icons/IconArrowBack.vue';

export default Vue.extend({
  name: 'BaseButtonBack',
  components: {
    BaseIcon,
    IconArrowBack
  },
  methods: {
    goBack() {
      return this.$router.go(-1);
    }
  }
});
</script>

<style lang="scss" scoped>
.button {
  background-color: $background-color;
  border: 1px solid $primary-color;
  border-radius: 0;
  color: $primary-color;
  cursor: pointer;
  display: inline-block;
  margin: 0;
  outline: none;
  padding: 9px 12px;

  &__icon {
    display: inline-block;
    fill: $primary-color;
    stroke: $primary-color;
    vertical-align: text-top;
  }
  &__name {
    color: $primary-color;
    font-size: $button-size;
    font-weight: normal;
    letter-spacing: 0.1rem;
    padding-left: 8px;
    margin: 0;
  }
  &:hover,
  &:focus,
  &:hover path,
  &:focus path,
  &:hover span,
  &:focus span {
    background-color: $primary-color;
    border: 1px solid $primary-color;
    color: $text-color;
    fill: $text-color;
    stroke: $text-color;
  }
  &:active,
  &:active path,
  &:active span {
    background-color: $primary-color;
    border: 1px solid $primary-color;
    color: $text-color;
    fill: $text-color;
    stroke: $text-color;
    opacity: 0.5;
  }
}
</style>
