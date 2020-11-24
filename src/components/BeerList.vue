<template>
  <div>
    <section v-if="apiError">
      <p>
        The inforamtion you have requrested is currently not available. Please
        try again later.
      </p>
    </section>
    <section v-else>
      <div v-if="isLoading">Loading beers ...</div>
      <div v-else class="beers">
        <BaseSearch
          v-bind:searchId="searchId"
          v-bind:placeholder="placeholder"
          v-bind:ariaLabel="ariaLabel"
          v-model="searchQuery"
        />
        <p>Filter by taste category</p>
        <BaseFilterButton
          v-bind:options="categories"
          v-on:change="handleCategories"
        />
        <p>Filter by beer award</p>
        <BaseFilterButton v-bind:options="awards" v-on:change="handleAwards" />
        <p>Filter by year</p>
        <BaseFilterButton v-bind:options="years" v-on:change="handleYears" />
        <p></p>
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
            <BeerListItem
              v-bind:beer="beer"
              v-on:select="toggleFavourite(beer)"
              v-bind:isFavourite="isFavourite"
            />
          </li>
        </ul>
        <p v-show="noResults">
          Your search did not match any beer.
        </p>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Beer from './Beer';
import BaseSearch from '../components/ui/BaseSearch.vue';
import BeerListItem from './BeerListItem.vue';
import BaseFilterButton from '../components/ui/BaseFilterButton.vue';

export default Vue.extend({
  name: 'BeerList',
  components: {
    BeerListItem,
    BaseFilterButton,
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
      ariaLabel: 'Search for beers or breweries',
      selectedCategories: [] as string[],
      selectedAwards: [] as string[],
      selectedYears: [] as string[],
      favourites: [] as Beer[],
      isFavourite: false
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
    handleCategories(selectedCategories: string[]) {
      this.selectedCategories = selectedCategories;
    },
    handleAwards(selectedAwards: string[]) {
      this.selectedAwards = selectedAwards;
    },
    handleYears(selectedYears: string[]) {
      this.selectedYears = selectedYears;
    },
    toggleFavourite(beer: Beer) {
      this.favourites.includes(beer)
        ? (this.favourites = this.favourites.filter(
            favourite => favourite !== beer
          ))
        : this.favourites.push(beer);
      this.isFavourite = !this.isFavourite;
    }
  },
  computed: {
    totalBeers(): number {
      return this.filteredBeers.length;
    },
    categories(): string[] {
      return [...new Set(this.beers.map(beer => beer.category))];
    },
    awards(): string[] {
      return [...new Set(this.beers.map(beer => beer.award))];
    },
    years(): string[] {
      return [...new Set(this.beers.map(beer => beer.year))];
    },
    filteredBeers(): Beer[] {
      const searchQuery =
        this.searchQuery.length < 3 ? '' : this.searchQuery.toLowerCase();
      const filteredCategories =
        this.selectedCategories.length == 0
          ? this.categories
          : this.selectedCategories;
      const filteredAwards =
        this.selectedAwards.length == 0 ? this.awards : this.selectedAwards;
      const filterdYears =
        this.selectedYears.length == 0 ? this.years : this.selectedYears;

      return this.beers
        .filter(beer => filteredCategories.includes(beer.category))
        .filter(beer => filteredAwards.includes(beer.award))
        .filter(beer => filterdYears.includes(beer.year))
        .filter(
          beer =>
            beer.name.toLowerCase().includes(searchQuery) ||
            beer.brewery.toLowerCase().includes(searchQuery)
        );
    },
    noResults(): boolean {
      return this.filteredBeers != undefined && this.filteredBeers.length < 1;
    }
  }
});
</script>

<style lang="scss" scoped>
.beers {
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
