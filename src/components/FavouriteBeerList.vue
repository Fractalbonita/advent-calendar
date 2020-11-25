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
      <div v-else-if="beers.length === 0">
        <p>
          You haven't any favorite beers yet. Add beers by tapping on the heart
          icon.
        </p>
      </div>
      <div v-else>
        <div class="favourites">
          <p class="beers__headline">
            You have {{ totalFavourites }} favourite beers.
          </p>
          <ul class="favourites__tiles">
            <li
              v-for="beer in beers"
              v-bind:key="beer.id"
              v-bind:beer="beer"
              class="favourites__tile"
            >
              <BeerListItem
                v-bind:beer="beer"
                v-on:select="deleteFavourite(beer.id)"
                v-bind:isFavourite="favourites.includes(beer.id)"
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Beer from './Beer';
import BeerListItem from './BeerListItem.vue';

export default Vue.extend({
  name: 'FavouriteBeerList',
  components: {
    BeerListItem
  },
  data() {
    return {
      beers: [] as Beer[],
      favourites: [] as string[],
      apiError: false,
      isLoading: false
    };
  },
  created() {
    fetch(process.env.VUE_APP_BEER_API_URL + '/favourites')
      .then(res => res.json())
      .then((data: { id: string }[]) => data.map(({ id }) => id))
      .then((favourites: string[]) => (this.favourites = favourites))
      .then(() => fetch(process.env.VUE_APP_BEER_API_URL + '/beers'))
      .then(res => res.json())
      .then(
        (beers: Beer[]) =>
          (this.beers = beers.filter(beer => this.favourites.includes(beer.id)))
      )
      .catch(error => {
        console.log(error.message);
        this.apiError = true;
      })
      .finally(() => (this.isLoading = false));
  },
  methods: {
    deleteFavourite(id: string) {
      fetch(process.env.VUE_APP_BEER_API_URL + '/favourites/' + id, {
        method: 'DELETE'
      })
        .then(() => (this.beers = this.beers.filter(beer => beer.id !== id)))
        .catch(error => console.error(error));
    }
  },
  computed: {
    totalFavourites(): number {
      return this.beers.length;
    }
  }
});
</script>

<style lang="scss" scoped>
.favourites {
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
