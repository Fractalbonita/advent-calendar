<template>
  <div>
    <section v-if="apiError">
      <p class="favourites__error">
        The inforamtion you have requrested is currently not available. Please
        try again later.
      </p>
    </section>
    <section v-else>
      <div v-if="isLoading">
        <BaseLoading title="favourites" />
      </div>
      <div v-else-if="beers.length === 0" class="favourites__fallback">
        <BaseIcon
          icon-name="beer"
          width="72"
          height="72"
          class="favourites__icon"
        >
          <IconBeerMug />
        </BaseIcon>
        <p>
          You haven't any favourite beers yet. Add beers by tapping on the heart
          icon.
        </p>
      </div>
      <div v-else>
        <div class="favourites__wrapper">
          <p v-if="beers.length === 1" class="favourites__headline">
            You have
            <span class="favourites__headline_counter"
              >{{ totalFavourites }}
            </span>
            favourite beer.
          </p>
          <p v-else class="favourites__headline">
            You have
            <span class="favourites__headline_counter"
              >{{ totalFavourites }}
            </span>
            favourite beers.
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
import BaseLoading from './ui/BaseLoading.vue';
import BaseIcon from './ui/BaseIcon.vue';
import IconBeerMug from './icons/IconBeerMug.vue';
import BeerListItem from './BeerListItem.vue';

export default Vue.extend({
  name: 'FavouriteBeerList',
  components: {
    BaseLoading,
    BaseIcon,
    IconBeerMug,
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
  &__error {
    font-size: $body-size;
    font-weight: normal;
    line-height: 1.5;
    margin: 0.5rem 0;
  }
  &__fallback {
    font-size: $body-size;
    font-weight: normal;
    line-height: 1.5;
    margin: 0.5rem 0;
    text-align: center;
  }
  &__icon {
    fill: $primary-color;
    margin: 1rem 0;
    stroke: $text-color;
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
      font-size: $headline-2-size;
      font-family: 'Lobster';
      font-size: $headline-2-size;
      font-weight: bold;
      letter-spacing: 0.2rem;
    }
  }
}
</style>
