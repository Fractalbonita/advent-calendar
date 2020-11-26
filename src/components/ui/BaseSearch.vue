<template>
  <form class="search" v-on:reset="$emit('input', '')">
    <label class="search__label">
      <span aria-hidden="true" focusable="false" class="search__icon"
        ><BaseIcon icon-name="search" width="24" height="24"
          ><IconSearch /></BaseIcon
      ></span>
      <input
        v-bind:id="searchId"
        name="search"
        type="search"
        autocomplete="off"
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
      <BaseIcon
        icon-name="clear"
        width="24"
        height="24"
        icon-border="#000000"
        icon-color="#000000"
        ><IconClear
      /></BaseIcon>
    </button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import BaseIcon from './BaseIcon.vue';
import IconSearch from '../icons/IconSearch.vue';
import IconClear from '../icons/IconClear.vue';

export default Vue.extend({
  name: 'BaseSearch',
  components: {
    BaseIcon,
    IconSearch,
    IconClear
  },
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
    align-items: center;
    display: flex;
    fill: #42b983;
    height: 36px;
    justify-content: center;
    left: 6px;
    position: absolute;
    stroke: #42b983;
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
      border: 1px solid $primary-color;
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

    & svg {
      fill: $secondary-color;
      position: absolute;
      stroke: $secondary-color;
      top: 6px;
      left: 6px;

      &:hover,
      &:focus {
        fill: $primary-color;
        stroke: $primary-color;
      }
      &:active {
        fill: $primary-color;
        stroke: $primary-color;
        opacity: 0.5;
      }
    }
  }
}
</style>
