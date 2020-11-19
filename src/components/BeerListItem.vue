<template>
  <router-link
    v-bind:to="{ name: 'BeerDetails', params: { slug: beer.slug } }"
    class="beer"
  >
    <div class="beer__image">
      <img v-bind:src="getImage()" v-bind:alt="beer.name" />
    </div>
    <h1 class="beer__headline">{{ beer.name }}</h1>
    <h2 class="beer__subheadline">{{ beer.brewery }}</h2>
    <div class="beer__text_wrapper">
      <span class="beer__text_category">{{ beer.category }}</span>
      <span class="beer__text_award">{{ beer.award }}</span>
    </div>
  </router-link>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import Beer from './Beer';

export default Vue.extend({
  name: 'BeerListItem',
  props: {
    beer: { type: Object as PropType<Beer> }
  },
  methods: {
    getImage() {
      if (!this.beer.image) {
        return (
          process.env.VUE_APP_BEER_IMAGES_URL +
          '/assets/images/gonzalo-remy-JCIJnIXv7SE-unsplash.jpg'
        );
      } else {
        return process.env.VUE_APP_BEER_IMAGES_URL + this.beer.image;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.beer {
  color: $secondary-color;
  height: 100%;
  text-decoration: none;
  width: 100%;
  word-break: normal;

  &__image {
    height: 200px;
    overflow: hidden;
    width: 100%;

    & img {
      height: auto;
      max-height: 100%;
      min-width: 100%;
      object-fit: cover;
      object-position: 30% 80%;
      width: auto;
    }
  }
  &__headline {
    color: $primary-color;
    font-size: $headline-2-size;
    margin: 1rem 0.5rem 0.5rem;
  }
  &__subheadline {
    color: $secondary-color;
    font-size: $subtitle-1-size;
    font-weight: 500;
    margin: 0.5rem 0.5rem 0.8rem;
  }
  &__text {
    &_wrapper {
      align-items: center;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 0.5rem;
    }
    &_category {
      background-color: $primary-color;
      border: 1px solid $primary-color;
      border-radius: 0;
      color: white;
      font-size: $caption-size;
      margin: 0;
      padding: 5px 10px;
    }
    &_award {
      font-size: $caption-size;
      margin: 0;
    }
  }
}
</style>
