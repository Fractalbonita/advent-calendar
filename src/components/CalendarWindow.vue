<template>
  <div v-if="openWindow" key="window-open" class="window window--open">
    <p class="window__overline">{{ windowNumber }}</p>
    <h3
      v-on:click.stop="$emit('open-window')"
      class="window__headline window__headline--open"
    >
      {{ beer.name }}
    </h3>
    <p class="window__subtitle-1">{{ beer.category }}</p>
    <p class="window__subtitle-2">{{ beer.brewery }}</p>
  </div>
  <div v-else key="window-closed" class="window window--closed">
    <h1 class="window__headline window__headline--closed">
      {{ windowNumber }}
    </h1>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import Beer from './Beer';

export default Vue.extend({
  name: 'CalendarWindow',
  props: {
    openWindow: Boolean,
    windowNumber: Number,
    beer: { type: Object as PropType<Beer> }
  }
});
</script>

<style lang="scss" scoped>
.window {
  display: flex;
  flex-direction: column;
  height: 150px;
  justify-content: center;
  width: 150px;

  &__overline {
    font-family: 'Lobster';
    font-size: $overline-size;
    font-weight: normal;
    margin: 0.2rem 0.5rem;
  }
  &__headline {
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    font-family: 'Lobster';
    font-weight: bold;
    letter-spacing: 0.1rem;
    margin: 0.5rem;
    overflow: hidden;
    word-break: noraml;

    &--open {
      color: $primary-color;
      font-size: $headline-3-size;
      font-weight: bold;

      &:hover,
      &:focus {
        color: $secondary-color;
      }
    }
    &--closed {
      color: $text-color;
      font-size: $headline-1-size;
      font-weight: bold;
    }
  }
  &__subtitle-1 {
    font-size: $subtitle-1-size;
    font-weight: normal;
    margin: 0.2rem 0.5rem;
  }
  &__subtitle-2 {
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    font-size: $subtitle-2-size;
    font-weight: normal;
    margin: 0.2rem 0.5rem;
    overflow: hidden;
    word-break: noraml;
  }
  &--closed {
    background-color: $primary-color;
    border: 1px solid $primary-color;
    text-align: center;

    &:hover,
    &:focus {
      background-color: $surface-color;
      border: 1px solid $primary-color;
    }
    &:hover h1,
    &:focus h1 {
      color: $primary-color;
    }
  }
  &--open {
    background-color: $surface-color;
    border: 1px solid $surface-color;
    text-align: center;
  }
}
</style>
