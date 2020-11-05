<template>
  <div>
    <Countdown v-bind:count="countDown()" />
    <BaseModal
      v-if="showModal"
      v-bind:closeModal="closeModal"
      v-on:close="closeModal"
      v-bind:scrollable="scrollable"
    />
    <ul>
      <li
        v-for="beer in randomBeers"
        v-bind:key="beer.id"
        v-on:click="toggleWindow(beer.id)"
      >
        <div
          v-if="open.includes(beer.id)"
          key="window-open"
          class="window--open"
        >
          <p class="window__overline">{{ getWindowNumber(beer) }}</p>
          <h2 v-on:click="showModal = true" class="window__headline-2">
            {{ beer.name }}
          </h2>
          <p class="window__subtitle-1">{{ beer.category }}</p>
          <p class="window__subtitle-2">{{ beer.brewery }}</p>
        </div>
        <div v-else key="window-closed" class="window--closed">
          <h2 class="window__headline-2">{{ getWindowNumber(beer) }}</h2>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Countdown from './Countdown.vue';
import BaseModal from './BaseModal.vue';

interface Beer {
  id: number;
  name: string;
  category: string;
  brewery: string;
}

export default Vue.extend({
  name: 'CalendarWindow',
  components: {
    Countdown,
    BaseModal
  },
  data() {
    return {
      beers: [] as Beer[],
      randomBeers: [] as Beer[],
      open: [] as string[],
      showModal: false,
      scrollable: false
    };
  },
  created() {
    fetch(process.env.VUE_APP_BEER_API_URL)
      .then(res => res.json())
      .then((beers: Beer[]) => {
        this.beers = beers;
        this.randomBeers = [...beers].sort(() =>
          Math.random() > 0.5 ? 1 : -1
        );
      })
      .catch(error => console.log(error.message));
  },
  methods: {
    toggleWindow(id: string) {
      this.open.includes(id)
        ? this.open.splice(this.open.indexOf(id), 1)
        : this.open.push(id);
    },
    countDown() {
      return this.beers.length - this.open.length;
    },
    getWindowNumber(beer: Beer) {
      return this.beers.indexOf(beer) + 1;
    },
    closeModal() {
      this.showModal = !this.showModal;
    }
  }
});
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  list-style-type: none;
  padding: 0;
}
li {
  cursor: pointer;
  display: inline-block;
  margin: 0;
  padding: 5px;
}
.window {
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
    display: flex;
    flex-direction: column;
    height: 160px;
    justify-content: center;
    text-align: center;
    width: 160px;
  }
  &--open {
    border: 1px solid $primary-color;
    display: flex;
    flex-direction: column;
    height: 160px;
    justify-content: center;
    text-align: center;
    width: 160px;
  }
}
</style>
