<template>
  <div>
    <Countdown v-bind:count="countDown()" />
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
          <h2 class="window__headline-2">{{ beer.name }}</h2>
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

interface Beer {
  id: number;
  name: string;
  category: string;
  brewery: string;
}

export default Vue.extend({
  name: 'CalendarWindow',
  components: {
    Countdown
  },
  data() {
    return {
      beers: [] as Beer[],
      randomBeers: [] as Beer[],
      open: [] as string[]
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
      // randomize numbers with appropiate algorithm
    }
  }
});
</script>

<style scoped lang="scss">
ul {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
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
    color: $primary-color;
    font-size: $headline-2-size;
    margin: 0.5rem;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
  }
  &__subtitle-1 {
    font-size: $subtitle-1-size;
    margin: 0.5rem;
  }
  &__subtitle-2 {
    font-size: $subtitle-2-size;
    margin: 0.5rem;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
  }
  &--closed {
    border: 1px solid $primary-color;
    text-align: center;
    height: 160px;
    width: 160px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  &--open {
    border: 1px solid $primary-color;
    text-align: center;
    height: 160px;
    width: 160px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
}
</style>
