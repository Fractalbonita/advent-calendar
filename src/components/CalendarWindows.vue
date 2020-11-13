<template>
  <div v-on:keyup.esc="closeModal" tabindex="0" class="container">
    <Countdown v-bind:count="countDown()" />
    <CalendarWindowContentModal
      v-if="shown"
      v-bind:close="closeModal"
      v-bind:beer="beer"
    />
    <ul class="calendar">
      <li
        v-for="beer in randomBeers"
        v-bind:key="beer.id"
        v-on:click="toggleWindow(beer.id)"
        class="calendar__window"
      >
        <CalendarWindow
          v-bind:openWindow="open.includes(beer.id)"
          v-on:open-window="showModal(beer)"
          v-bind:windowNumber="getWindowNumber(beer)"
          v-bind:name="beer.name"
          v-bind:category="beer.category"
          v-bind:brewery="beer.brewery"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Countdown from './Countdown.vue';
import CalendarWindowContentModal from './CalendarWindowContentModal.vue';
import CalendarWindow from './CalendarWindow.vue';
import Beer from './Beer';

export default Vue.extend({
  name: 'CalendarWindows',
  components: {
    Countdown,
    CalendarWindowContentModal,
    CalendarWindow
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
    fetch(process.env.VUE_APP_BEER_API_URL + '/beers?_limit=24')
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
    getWindowNumber(beer: Beer) {
      return this.beers.indexOf(beer) + 1;
    },
    countDown() {
      return this.beers.length - this.open.length;
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
.container {
  outline: none;
}
.calendar {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  list-style-type: none;
  padding: 0;

  &__window {
    cursor: pointer;
    margin: 0;
    padding: 5px;
  }
}
</style>
