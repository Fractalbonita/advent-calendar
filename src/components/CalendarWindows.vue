<template>
  <div v-on:keyup.esc="closeModal" tabindex="0" class="calendar">
    <section v-if="apiError">
      <p class="calendar__error">
        The inforamtion you have requrested is currently not available. Please
        try again later.
      </p>
    </section>
    <section v-else>
      <div v-if="isLoading">
        <BaseLoading title="calendar" />
      </div>
      <div v-else>
        <Countdown v-bind:count="countDown" class="calendar__countdown" />
        <CalendarWindowContentModal
          v-if="shown"
          v-bind:close="closeModal"
          v-bind:beer="beer"
        />
        <ul class="calendar__wrapper">
          <li
            v-for="beer in randomBeers"
            v-bind:key="beer.id"
            v-on:click="toggleWindow(beer)"
            class="calendar__window"
          >
            <CalendarWindow
              v-bind:openWindow="open.includes(beer.id)"
              v-on:open-window="showModal(beer)"
              v-bind:windowNumber="getWindowNumber(beer)"
              v-bind:beer="beer"
            />
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Beer from './Beer';
import BaseLoading from './ui/BaseLoading.vue';
import Countdown from './Countdown.vue';
import CalendarWindowContentModal from './CalendarWindowContentModal.vue';
import CalendarWindow from './CalendarWindow.vue';

export default Vue.extend({
  name: 'CalendarWindows',
  components: {
    BaseLoading,
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
      beer: {} as Beer,
      apiError: false,
      isLoading: true
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
      .catch(error => {
        console.log(error.message);
        this.apiError = true;
      })
      .finally(() => (this.isLoading = false));
  },
  methods: {
    toggleWindow(beer: Beer) {
      const now = new Date();
      const windowOpenDate = new Date(2020, 11, this.getWindowNumber(beer));
      if (now < windowOpenDate) {
        return;
      }
      this.open.includes(beer.id) || this.open.push(beer.id);
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
  },
  computed: {
    countDown(): number {
      return this.beers.length - this.open.length;
    }
  }
});
</script>

<style lang="scss" scoped>
.calendar {
  outline: none;

  &__error {
    font-size: $body-size;
    font-weight: normal;
    line-height: 1.5;
    margin: 0.5rem 0;
  }
  &__countdown {
    text-align: center;
  }
  &__wrapper {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    list-style-type: none;
    padding: 0;
    margin: 2rem 0;
  }
  &__window {
    cursor: pointer;
    margin: 0;
    padding: 5px;
  }
}
</style>
