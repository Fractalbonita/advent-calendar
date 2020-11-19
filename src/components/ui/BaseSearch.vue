<template>
  <div class="search">
    <label>
      <span aria-hidden="true" focusable="false" class="search__icon"
        >Icon</span
      >
      <input
        v-bind:id="searchId"
        name="search"
        type="search"
        v-bind:placeholder="placeholder"
        v-bind:aria-label="ariaLabel"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
        class="search__input"
    /></label>
    <button
      type="button"
      aria-label="Clear search"
      v-on:click="$emit('clear-search')"
      class="search__button--clear"
    >
      X
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseSearch',
  props: {
    value: String,
    searchId: String,
    placeholder: String,
    ariaLabel: String,
    displayReset: Boolean
  }
});
</script>

<style lang="scss" scoped>
.search {
  align-items: center;
  display: flex;
  position: relative;

  &__label {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  &__icon {
    font-size: 18px;
  }
  &__input {
    border: 1px solid $secondary-color;
    border-radius: 0;
    cursor: text;
    height: 48px;
    padding: 0 30px;

    &::-webkit-search-cancel-button {
      display: none;
    }
    &:hover {
      border: 2px solid $primary-color;
    }
    &:focus {
      border: 2px solid $primary-color;
    }
  }
  &__button--clear {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 24px;
    position: absolute;
    left: 200px;
    height: 36px;
    width: 36px;
  }
}
</style>

<!-- .search-box:not(:valid) ~ .close-icon { display: none; } -->
