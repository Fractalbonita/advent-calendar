<template>
  <div>
    <section v-if="apiError">
      <p class="beers__error">
        The inforamtion you have requrested is currently not available. Please
        try again later.
      </p>
    </section>
    <section v-else>
      <div v-if="isLoading">
        <BaseLoading title="beers" />
      </div>
      <div v-else class="beers">
        <BaseSearch
          v-bind:searchId="searchId"
          v-bind:placeholder="placeholder"
          v-bind:ariaLabel="ariaLabel"
          v-model="searchQuery"
        />
        <p v-show="noResults" class="beers__search">
          Your search did not match any beer.
        </p>
        <p class="beers__caption">Filter by taste category</p>
        <BaseFilterButton
          v-bind:options="categories"
          v-on:change="handleCategories"
        />
        <p class="beers__caption">Filter by beer award</p>
        <BaseFilterButton v-bind:options="awards" v-on:change="handleAwards" />
        <p class="beers__caption">Filter by year</p>
        <BaseFilterButton v-bind:options="years" v-on:change="handleYears" />
        <h2
          v-if="filteredBeers.length === 1"
          key="single-beer"
          class="beers__headline"
        >
          There is
          <span class="beers__headline_counter">
            {{ totalBeers }}
          </span>
          beer to give a taste.
        </h2>
        <h2 v-else key="multiple-beers" class="beers__headline">
          There are
          <span class="beers__headline_counter">
            {{ totalBeers }}
          </span>
          beers to give a taste.
        </h2>
        <ul class="beers__tiles">
          <li
            v-for="beer in filteredBeers"
            v-bind:key="beer.id"
            v-bind:beer="beer"
            class="beers__tile"
          >
            <BeerListItem
              v-bind:beer="beer"
              v-on:select="toggleFavourite(beer.id)"
              v-bind:isFavourite="favourites.includes(beer.id)"
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
import BaseSearch from '../components/ui/BaseSearch.vue';
import BeerListItem from './BeerListItem.vue';
import BaseFilterButton from '../components/ui/BaseFilterButton.vue';

export default Vue.extend({
  name: 'BeerList',
  components: {
    BaseLoading,
    BaseSearch,
    BeerListItem,
    BaseFilterButton
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
      favourites: [] as string[]
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
    fetch(process.env.VUE_APP_BEER_API_URL + '/favourites')
      .then(res => res.json())
      .then((data: { id: string }[]) => data.map(({ id }) => id))
      .then((favourites: string[]) => (this.favourites = favourites));
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
    toggleFavourite(id: string) {
      if (this.favourites.includes(id)) {
        this.favourites = this.favourites.filter(favourite => favourite !== id);
        fetch(process.env.VUE_APP_BEER_API_URL + '/favourites/' + id, {
          method: 'DELETE'
        }).catch(error => console.error(error));
      } else {
        fetch(process.env.VUE_APP_BEER_API_URL + '/favourites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
        })
          .then(() => this.favourites.push(id))
          .catch(error => console.error(error));
      }
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
  &__search {
    font-size: $body-size;
    font-weight: normal;
    line-height: 1.5;
    margin: 0.5rem 0;
    text-align: center;
  }
  &__error {
    font-size: $body-size;
    font-weight: normal;
    line-height: 1.5;
    margin: 0.5rem 0;
  }
  &__caption {
    font-size: $body-size;
    font-weight: normal;
    line-height: 1.5;
    margin: 1rem 0 0.5rem 0;
  }
  &__headline {
    color: $text-color;
    font-size: $body-size;
    font-weight: normal;
    line-height: 1.5;
    margin: 1.5rem 0 0.5rem;
    text-align: center;

    &_counter {
      color: $primary-color;
      font-family: 'Lobster';
      font-size: $headline-2-size;
      font-weight: bold;
      letter-spacing: 0.2rem;
    }
  }
  &__tiles {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  &__tile {
    background-color: $surface-color;
    border: 1px solid $surface-color;
    border-radius: 0;
    cursor: pointer;
    flex: 1 1 250px;
    margin: 10px;
    padding: 10px;

    &:hover,
    &:focus {
      filter: sepia(40%);
    }
    &:active {
      opacity: 0.3;
    }
  }
}
</style>
