<template>
  <div class="beers">
    <section v-if="apiError">
      <p>
        The inforamtion you have requrested is currently not available. Please
        try again later.
      </p>
    </section>
    <section v-else>
      <div v-if="isLoading">Loading ...</div>
      <div v-else>
        <BaseSearch
          v-bind:searchId="searchId"
          v-bind:placeholder="placeholder"
          v-bind:ariaLabel="ariaLabel"
          v-model="searchQuery"
          v-on:clear-search="clearSearch"
        />
        <p class="beers__headline">
          There are {{ totalBeers }} beers to give a taste.
        </p>
        <ul class="beers__tiles">
          <li
            v-for="beer in filteredBeers"
            v-bind:key="beer.id"
            v-bind:beer="beer"
            class="beers__tile"
          >
            <BeerListItem v-bind:beer="beer" />
          </li>
        </ul>
        <p v-shown="noResults">
          Your search did not match any beer or brewery.
        </p>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Beer from './Beer';
import BeerListItem from './BeerListItem.vue';
import BaseSearch from '../components/ui/BaseSearch.vue';

export default Vue.extend({
  name: 'BeerList',
  components: {
    BeerListItem,
    BaseSearch
  },
  data() {
    return {
      beers: [] as Beer[],
      apiError: false,
      isLoading: true,
      searchQuery: '',
      searchId: 'search-beer',
      placeholder: 'Beers or breweries',
      ariaLabel: 'Search for beers or breweries'
    };
  },
  created() {
    fetch(process.env.VUE_APP_BEER_API_URL + '/beers')
      .then(res => res.json())
      .then((beers: Beer[]) => (this.beers = beers))
      .catch(error => {
        console.log(error.message);
        this.apiError = true;
      })
      .finally(() => (this.isLoading = false));
  },
  methods: {
    clearSearch() {
      this.searchQuery = '';
    }
  },
  computed: {
    totalBeers(): number {
      return this.beers.length;
    },
    filteredBeers(): Beer[] {
      if (this.searchQuery.length < 3 || !this.beers.length) {
        return this.beers;
      } else {
        return this.beers.filter(beer => {
          if (
            beer.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          ) {
            return beer.name;
          } else if (
            beer.brewery.toLowerCase().includes(this.searchQuery.toLowerCase())
          ) {
            return beer.brewery;
          }
        });
      }
    },
    noResults(): boolean {
      if (typeof this.filteredBeers === 'undefined') {
        return false;
      } else {
        return this.filteredBeers.length < 1;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.beers {
  padding: 15px;

  &__tiles {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    list-style-type: none;
    padding: 0;
  }
  &__tile {
    border: 1px solid $primary-color;
    border-radius: 0;
    cursor: pointer;
    flex: 1 1 250px;
    margin: 10px;
    padding: 10px;
  }
}
</style>
