<template>
  <div v-on:keyup.esc="closeModal" tabindex="0" class="calendar">
    <section v-if="apiError">
      <p>
        The inforamtion you have requrested is currently not available. Please
        try again later.
      </p>
    </section>
    <section v-else>
      <div v-if="isLoading">Loading calendar ...</div>
      <div v-else>
        <Countdown v-bind:count="countDown" />
        <CalendarWindowContentModal
          v-if="shown"
          v-bind:close="closeModal"
          v-bind:beer="beer"
        />
        <ul class="calendar__wrapper">
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
    toggleWindow(id: string) {
      this.open.includes(id)
        ? this.open.splice(this.open.indexOf(id), 1)
        : this.open.push(id);
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

  &__wrapper {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    list-style-type: none;
    padding: 0;
  }
  &__window {
    cursor: pointer;
    margin: 0;
    padding: 5px;
  }
}
</style>
