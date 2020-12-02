<template>
  <section>
    <h2 class="description__headline">Fancy more beers?</h2>
    <p class="description__text">
      On the 24th of December a list of all beers will be available on the
      <span class="description__highlight">Beers</span>
      page. You can search for a specific beer by the name of the beer or
      brewery. You can also filter the beer list by different tags such as beer
      style, award, and year.
    </p>
    <p class="description__text">
      If you tap on any beer, you will be guided to the details page.
    </p>
    <div class="description__wrapper">
      <button type="button" class="description__link">
        <router-link v-bind:to="{ name: 'Beers' }">
          Go to Beers
        </router-link>
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DescriptionBeerList'
});
</script>

<style lang="scss" scoped>
.description {
  &__headline {
    color: $primary-color;
    font-family: 'Lobster';
    font-size: $headline-2-size;
    font-weight: bold;
    margin: 2rem 0 1rem;
    text-align: center;
  }
  &__text {
    font-size: $body-size;
    font-weight: normal;
    line-height: 1.5;
    margin: 1rem 0;
  }
  &__highlight {
    color: $primary-color;
    font-family: 'Lobster';
    font-size: $headline-2-size;
    font-weight: normal;
    letter-spacing: 0.1rem;
    line-height: 1.5;
    margin: 1rem 0;
  }
  &__wrapper {
    margin: 2rem 0;
    text-align: center;
  }
  &__link {
    background: $primary-color;
    border: 1px solid $primary-color;
    outline: none;
    padding: 9px 12px;

    & a {
      color: $text-color;
      font-size: $button-size;
      font-weight: normal;
      letter-spacing: 0.1rem;
      text-decoration: none;
    }
    &:hover,
    &:focus {
      background-color: $primary-color;
      border: 1px solid $primary-color;
      color: $text-color;
    }
    &:active {
      background-color: $primary-color;
      border: 1px solid $primary-color;
      color: $text-color;
      opacity: 0.5;
    }
  }
}
</style>
