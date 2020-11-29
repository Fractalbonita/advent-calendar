<template>
  <BaseModal v-bind:closeModal="close" v-bind:scrollable="scrollable">
    <template v-slot:header>
      <h1 class="delete__headline">Are you sure?</h1>
    </template>
    <template v-slot:main
      ><p class="delete__text">
        Do you really want to delete this comment permanently?
      </p></template
    >
    <template v-slot:footer>
      <button
        type="button"
        v-on:click="$emit('cancel')"
        class="delete__button delete__button--cancel"
      >
        Cancel</button
      ><button
        type="button"
        v-on:click="$emit('delete')"
        class="delete__button delete__button--delete"
      >
        Delete
      </button>
    </template>
  </BaseModal>
</template>

<script lang="ts">
import Vue from 'vue';
import BaseModal from './ui/BaseModal.vue';

export default Vue.extend({
  name: 'BeerDeleteModal',
  components: {
    BaseModal
  },
  data() {
    return {
      scrollable: false
    };
  },
  props: {
    close: Function
  }
});
</script>

<style lang="scss" scoped>
.delete {
  &__headline {
    color: $text-color;
    font-family: 'Lobster';
    font-size: $headline-1-size;
    font-weight: bold;
    margin: 0;
  }
  &__text {
    color: $text-color;
    font-size: $body-size;
    font-weight: normal;
    line-height: 1.5rem;
    margin: 0;
    text-align: left;
  }
  &__button {
    background-color: $surface-color;
    border: 1px solid $surface-color;
    border-radius: 0;
    color: $primary-color;
    cursor: pointer;
    font-size: $button-size;
    font-weight: normal;
    height: 36px;
    letter-spacing: 0.1rem;
    margin: 0 8px;
    outline: none;
    padding: 9px 12px;
    text-transform: uppercase;

    &--cancel,
    &--delete {
      &:hover,
      &:focus {
        background-color: $primary-color;
        border: 1px solid $primary-color;
        color: $text-color;
      }
      &:active {
        background-color: $primary-color;
        border: 1px solid $primary-color;
        color: $text-color;
        opacity: 0.5;
      }
    }
  }
}
</style>
