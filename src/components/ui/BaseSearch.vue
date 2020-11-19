<template>
  <form class="search" v-on:reset="$emit('input', '')">
    <label class="search__label">
      <span aria-hidden="true" focusable="false" class="search__icon">S</span>
      <input
        v-bind:id="searchId"
        name="search"
        type="search"
        v-bind:placeholder="placeholder"
        v-bind:aria-label="ariaLabel"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
        class="search__input"
      />
    </label>
    <button
      type="reset"
      aria-label="Clear search"
      v-if="value != ''"
      class="search__button--clear"
    >
      X
    </button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseSearch',
  props: {
    value: String,
    searchId: String,
    placeholder: String,
    ariaLabel: String
  }
});
</script>

<style lang="scss" scoped>
.search {
  margin: 0 auto;
  position: relative;
  width: 80%;

  &__label {
    display: flex;
    justify-content: center;
    position: relative;
  }
  &__icon {
    font-size: 24px;
    height: 36px;
    left: 6px;
    line-height: 36px;
    position: absolute;
    text-align: center;
    top: 6px;
    width: 36px;
  }
  &__input {
    border: 1px solid $secondary-color;
    border-radius: 0;
    cursor: text;
    font-size: $body-size;
    height: 48px;
    padding: 0 42px;
    width: 100%;

    &::-webkit-search-cancel-button {
      display: none;
    }
    &::placeholder {
      color: $secondary-color;
      font-size: $caption-size;
    }
    &:hover {
      border: 2px solid $primary-color;
    }
    &:focus {
      border: 2px solid $primary-color;
      outline: none;
    }
  }
  &__button--clear {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 24px;
    height: 36px;
    position: absolute;
    right: 6px;
    top: 6px;
    width: 36px;
  }
}
</style>
