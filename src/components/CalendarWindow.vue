<template>
  <div v-if="openWindow" key="window-open" class="window window--open">
    <p class="window__overline">{{ windowNumber }}</p>
    <h2 v-on:click.stop="$emit('open-window')" class="window__headline-2">
      {{ beer.name }}
    </h2>
    <p class="window__subtitle-1">{{ beer.category }}</p>
    <p class="window__subtitle-2">{{ beer.brewery }}</p>
  </div>
  <div v-else key="window-closed" class="window window--closed">
    <h2 class="window__headline-2">{{ windowNumber }}</h2>
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
    font-size: $overline-size;
    margin: 0.5rem;
    word-break: noraml;
  }
  &__headline-2 {
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: $primary-color;
    display: -webkit-box;
    font-size: $headline-2-size;
    margin: 0.5rem;
    overflow: hidden;
  }
  &__subtitle-1 {
    font-size: $subtitle-1-size;
    margin: 0.5rem;
  }
  &__subtitle-2 {
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    font-size: $subtitle-2-size;
    margin: 0.5rem;
    overflow: hidden;
  }
  &--closed {
    border: 1px solid $primary-color;
    text-align: center;
  }
  &--open {
    border: 1px solid $primary-color;
    text-align: center;
  }
}
</style>
