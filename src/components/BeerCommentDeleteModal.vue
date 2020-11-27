<template>
  <BaseModal v-bind:closeModal="close" v-bind:scrollable="scrollable">
    <template v-slot:main
      ><p class="delete__text">
        Are you sure you want to delete this comment permanently?
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
  &__text {
    font-size: $body-size;
    font-weight: bold;
    text-align: center;
  }
  &__button {
    background-color: $surface-color;
    border: none;
    border-radius: 0;
    color: $secondary-color;
    cursor: pointer;
    font-size: $button-size;
    height: 36px;
    margin: 0 8px;
    outline: none;
    padding: 9px 12px;
    text-transform: uppercase;

    &--cancel {
      &:hover,
      &:focus {
        background-color: $primary-color;
        border: 1px solid $primary-color;
        color: $surface-color;
      }
      &:active {
        background-color: $primary-color;
        border: 1px solid $primary-color;
        color: $surface-color;
        opacity: 0.5;
      }
    }
    &--delete {
      color: $primary-color;

      &:hover,
      &:focus {
        background-color: $primary-color;
        border: 1px solid $primary-color;
        color: $surface-color;
      }
      &:active {
        background-color: $primary-color;
        border: 1px solid $primary-color;
        color: $surface-color;
        opacity: 0.5;
      }
    }
  }
}
</style>
