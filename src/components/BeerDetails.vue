<template>
  <div>
    <p class="details__overline">{{ beer.brewery }}</p>
    <h1 class="details__headline">{{ beer.name }}</h1>
    <h2 class="details__subheadline">Facts</h2>
    <p class="details__note">
      <BaseIcon
        icon-name="opening quotation mark"
        width="30"
        height="30"
        class="details__quote--open"
      >
        <IconQuoteOpen />
      </BaseIcon>
      {{ beer.tastingNote }}
      <BaseIcon
        icon-name="opening quotation mark"
        width="30"
        height="30"
        class="details__quote--close"
      >
        <IconQuoteClose />
      </BaseIcon>
    </p>
    <section class="details__wrapper">
      <div class="details__image">
        <img v-bind:src="getImage()" v-bind:alt="beer.name" />
      </div>
      <div class="details__description">
        <h3 class="details__description_caption">Award</h3>
        <p class="details__description_text">{{ beer.award }}</p>
        <h3 class="details__description_caption">Year</h3>
        <p class="details__description_text">{{ beer.year }}</p>
        <h3 class="details__description_caption">Category</h3>
        <p class="details__description_text">{{ beer.category }}</p>
        <h3 class="details__description_caption">Style</h3>
        <p class="details__description_text">{{ beer.style }}</p>
        <h3 class="details__description_caption">Alcohol by volume</h3>
        <p class="details__description_text">{{ beer.abv }}</p>
        <h3 class="details__description_caption">Country</h3>
        <p class="details__description_text">{{ beer.country }}</p>
        <h3 class="details__description_caption">Website</h3>
        <a
          v-bind:href="beer.website"
          target="_blank"
          rel="nopener noreferrer"
          class="details__description_link"
          >{{ beer.website }}</a
        >
      </div>
    </section>
    <section class="comments__wrapper">
      <h2 class="comments__headline">Comments</h2>
      <BeerComment v-if="beer.id" v-bind:beer="beer" />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Beer from './Beer';
import BeerComment from './BeerComment.vue';
import BaseIcon from './ui/BaseIcon.vue';
import IconQuoteOpen from './icons/IconQuoteOpen.vue';
import IconQuoteClose from './icons/IconQuoteClose.vue';

export default Vue.extend({
  name: 'BeerDetails',
  components: {
    BeerComment,
    BaseIcon,
    IconQuoteOpen,
    IconQuoteClose
  },
  data() {
    return {
      beer: {} as Beer
    };
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  created() {
    fetch(process.env.VUE_APP_BEER_API_URL + '/beers?slug=' + this.slug)
      .then(res => res.json())
      .then((beers: Beer[]) => (this.beer = beers[0]))
      .catch(error => console.log(error.message));
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
.details {
  &__overline {
    font-size: $overline-size;
    font-weight: normal;
    margin: 2rem 0 0.5rem;
    text-transform: uppercase;
  }
  &__headline {
    color: $primary-color;
    font-family: 'Lobster';
    font-size: $headline-1-size;
    font-weight: bold;
    margin: 1rem 0;
  }
  &__subheadline {
    color: $primary-color;
    font-family: 'Lobster';
    font-size: $headline-2-size;
    font-weight: bold;
    margin: 1.5rem 0 1rem;
  }
  &__quote--open {
    display: inline-block;
    fill: $background-color;
    stroke: $primary-color;
    vertical-align: bottom;
  }
  &__quote--close {
    display: inline-block;
    fill: $background-color;
    stroke: $primary-color;
    vertical-align: text-top;
  }
  &__note {
    font-size: $body-size;
    font-weight: normal;
    line-height: 1.5;
    margin: 1rem 0.5rem 1.5rem;
    word-break: normal;
  }
  &__wrapper {
    align-items: start;
    display: flex;
    flex-flow: row wrap;
  }
  &__image {
    background-color: $text-color;
    border: 15px ridge $surface-color;
    flex: 1 1 180px;
    height: 540px;
    margin: 0 25px;
    overflow: hidden;
    text-align: center;
    width: auto;

    & img {
      height: auto;
      max-height: 100%;
      min-width: 100%;
      object-fit: scale-down;
      object-position: 50% 50%;
      width: auto;
    }
  }
  &__description {
    flex: 1 2 270px;
    overflow: hidden;

    &_caption {
      color: $tertiary-color;
      font-family: 'Lobster';
      font-size: $headline-3-size;
      font-weight: bold;
      margin: 1rem 0 0.5rem;
    }
    &_text {
      font-size: $body-size;
      font-weight: normal;
      line-height: 1.5;
      margin: 0;
      margin-right: 1.5rem;
      word-break: normal;
    }
    &_link {
      color: inherit;
      font-size: $body-size;
      font-weight: normal;
      line-height: 1.5;
      text-decoration: none;
      word-break: break-word;

      &:hover,
      &:focus {
        color: $primary-color;
        font-size: $headline-3-size;
      }
      &:active {
        border-bottom: 1px solid $primary-color;
        color: $primary-color;
        font-size: $headline-3-size;
      }
    }
  }
}
.comments {
  &__headline {
    color: $primary-color;
    font-family: 'Lobster';
    font-size: $headline-2-size;
    font-weight: bold;
    margin: 1.5rem 0;
  }
}
</style>
