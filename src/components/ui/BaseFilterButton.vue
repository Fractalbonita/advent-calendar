<template>
  <div class="filterr">
    <button
      type="button"
      v-for="option in options"
      v-bind:key="option"
      v-bind:item="option"
      v-on:click="handleFilter(option)"
      v-bind:aria-pressed="selectedOptions.includes(option)"
      class="filter__button"
    >
      {{ option }}
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseFilterButton',
  data() {
    return {
      selectedOptions: [] as string[]
    };
  },
  props: {
    options: Array
  },
  methods: {
    handleFilter(option: string) {
      if (this.selectedOptions.includes(option)) {
        this.selectedOptions = this.selectedOptions.filter(
          item => item != option
        );
      } else {
        this.selectedOptions.push(option);
      }
      this.$emit('change', this.selectedOptions);
    }
  }
});
</script>

<style lang="scss" scoped>
.filter {
  &__button {
    background-color: transparent;
    border: 1px solid $secondary-color;
    border-radius: 0;
    color: $secondary-color;
    cursor: pointer;
    font-size: $button-size;
    margin: 6px;
    outline: none;
    padding: 9px 12px;

    &:hover,
    &:focus {
      background-color: $surface-color;
      border: 1px solid $primary-color;
      color: $primary-color;
    }
    &:active {
      background-color: $primary-color;
      color: $surface-color;
      opacity: 0.5;
    }
    &[aria-pressed='true'] {
      background-color: $primary-color;
      border: 1px solid $primary-color;
      color: $surface-color;
    }
  }
}
</style>
