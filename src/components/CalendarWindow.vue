<template>
  <div v-on:keyup.esc="closeModal" tabindex="0">
    <Countdown v-bind:count="countDown()" />
    <BaseModal
      v-if="shown"
      v-bind:closeModal="closeModal"
      v-on:close="closeModal"
      v-bind:scrollable="scrollable"
    >
      <template v-slot:header
        ><h1>{{ beer.name }}</h1>
        <p>{{ beer.brewery }}</p></template
      >
      <template v-slot:main>
        <p>Image</p>
        <p>{{ beer.category }}</p>
        <p>{{ beer.award }}</p>
        <p>{{ beer.year }}</p>
        <p>{{ beer.style }}</p>
        <p>{{ beer.abv }}</p>
        <p>{{ beer.country }}</p>
        <p>
          {{ beer.tastingNote }}
        </p>
        <a
          v-bind:href="beer.website"
          target="_blank"
          rel="noopener noreferrer"
          >{{ beer.website }}</a
        >
      </template>
    </BaseModal>
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
          <h2 v-on:click="showModal(beer)" class="window__headline-2">
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
  award: string;
  year: string;
  name: string;
  brewery: string;
  tastingNote: string;
  category: string;
  country: string;
  style: string;
  abv: string;
  website: string;
  id: number;
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
      shown: false,
      beer: {} as Beer
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
      this.shown = !this.shown;
    },
    showModal(beer: Beer) {
      this.shown = true;
      this.beer = beer;
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
