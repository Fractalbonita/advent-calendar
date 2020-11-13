<template>
  <transition name="modal">
    <div class="modal">
      <BaseBackdrop v-bind:backdrop="true" v-on:close="closeModal" />
      <div
        class="modal__container"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <div class="modal__header" id="modalTitle">
          <slot name="header"></slot>
          <button
            type="button"
            v-on:click="closeModal"
            class="modal__button--close"
          >
            X
          </button>
        </div>
        <div
          class="modal__main"
          id="modalDescription"
          v-bind:class="{ scrollable: scrollable }"
        >
          <slot name="main"></slot>
        </div>
        <div class="modal__footer">
          <slot name="footer"></slot>
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
  props: {
    closeModal: Function,
    scrollable: Boolean
  },
  beforeMount() {
    document.body.style.overflow = 'hidden';
  },
  beforeDestroy() {
    document.body.style.overflow = '';
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
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-height: 80vh;
    padding: 24px 24px 12px;
    position: fixed;
    top: 10vh;
    transition: all 0.3s ease;
    width: 80%;
    z-index: 10000;
  }
  &__header {
    position: relative;
  }
  &__button--close {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: $button-size;
    height: 36px;
    width: 36px;
    position: absolute;
    right: 0;
    top: 0;
  }
  &__main {
    margin: 24px 0;
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
  }
  .scrollable {
    scrollbar-width: thin;
    overflow-y: auto;
  }
}
</style>
