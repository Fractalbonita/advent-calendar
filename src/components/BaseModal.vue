<template>
  <transition name="modal">
    <div class="modal">
      <BaseBackdrop v-bind:backdrop="true" v-bind:handleClick="closeModal" />
      <div
        class="modal__container"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <div class="modal__header" id="modalTitle">
          <slot name="header"
            >default header
            <button
              type="button"
              v-on:click="$emit('close')"
              class="modal__button--close"
            >
              X
            </button>
          </slot>
        </div>
        <div class="modal__body" id="modalDescription">
          <slot name="body">default body</slot>
        </div>
        <div class="modal__footer">
          <slot name="footer">default footer</slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import BaseBackdrop from './BaseBackdrop.vue';

export default Vue.extend({
  name: 'BaseModal',
  components: { BaseBackdrop },
  data() {
    return {
      handleClick: Function
    };
  },
  props: {
    closeModal: Function
  }
});
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;

  &-enter,
  &-leave-to {
    opacity: 0;
  }
  &-enter,
  &-leave-to {
    transform: translateX(10px);
  }
  &__container {
    background-color: $surface-color;
    border: 1px solid $surface-color;
    border-radius: 5px;
    box-shadow: 0 2px 8px $shadow-color;
    position: fixed;
    transition: all 0.3s ease;
    top: 10vh;
    width: 80%;
    z-index: 10000;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    margin: 24px;
  }
  &__button--close {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: $button-size;
    padding: 0;
  }
  &__body {
    margin: 24px;
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
    margin: 12px;
  }
}
</style>
