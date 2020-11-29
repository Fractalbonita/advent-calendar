<template>
  <router-link
    v-bind:to="{ name: 'BeerDetails', params: { slug: beer.slug } }"
    class="beer"
  >
    <div class="beer__image">
      <img v-bind:src="getImage()" v-bind:alt="beer.name" />
      <button
        type="button"
        aria-label="Toggle favourite"
        v-on:click.prevent="$emit('select')"
        class="beer__button--favourite"
      >
        <BaseIcon
          v-if="isFavourite"
          icon-name="favourite"
          width="24"
          height="24"
          class="beer__button--favourite-filled"
        >
          <IconFavourite />
        </BaseIcon>
        <BaseIcon
          v-else
          icon-name="favourite"
          width="24"
          height="24"
          class="beer__button--favourite-outline"
        >
          <IconFavourite />
        </BaseIcon>
      </button>
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
import BaseIcon from './ui/BaseIcon.vue';
import IconFavourite from './icons/IconFavourite.vue';

export default Vue.extend({
  name: 'BeerListItem',
  components: {
    BaseIcon,
    IconFavourite
  },
  props: {
    beer: { type: Object as PropType<Beer> },
    isFavourite: Boolean
  },
  methods: {
    getImage() {
      return (
        process.env.VUE_APP_BEER_IMAGES_URL +
        (this.beer.image ||
          '/assets/images/gonzalo-remy-JCIJnIXv7SE-unsplash.jpg')
      );
    }
  }
});
</script>

<style lang="scss" scoped>
.beer {
  color: $secondary-color;
  height: 100%;
  outline: none;
  text-decoration: none;
  width: 100%;
  word-break: normal;

  &__button--favourite {
    background-color: $surface-color;
    border: 1px solid $surface-color;
    border-radius: 50%;
    cursor: pointer;
    height: 36px;
    position: absolute;
    right: 16px;
    top: 8px;
    outline: none;
    width: 36px;

    & svg {
      left: 6px;
      position: absolute;
      stroke: $secondary-color;
      top: 6px;
    }
    &-filled {
      fill: $tertiary-color;
    }
    &-outline {
      fill: transparent;
    }
  }
  &__image {
    height: 200px;
    overflow: hidden;
    position: relative;
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
    font-family: 'Lobster';
    font-size: $headline-2-size;
    font-weight: bold;
    line-height: 1.5;
    margin: 1rem 0.5rem 0.5rem;
  }
  &__subheadline {
    color: $text-color;
    font-size: $subtitle-1-size;
    font-weight: normal;
    line-height: 1.5;
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
      color: $text-color;
      font-size: $caption-size;
      font-weight: normal;
      margin: 0;
      padding: 5px 10px;
      text-align: center;
    }
    &_award {
      color: $text-color;
      font-size: $overline-size;
      font-weight: normal;
      line-height: 1.5;
      margin: 0;
      text-align: right;
    }
  }
}
</style>
