<template>
  <section>
    <h2 class="description__headline">Collect your favourite ones!</h2>
    <p class="description__text">
      By tapping on the heart icon you can save your favourite beers, which will
      be added to your <span class="description__highlight">Favourites</span>.
    </p>
    <p class="description__text">
      You don't wnat to forget this delicious, hoppy and strong flavoured beer?
      Take notes! You can comment beers by tapping on a specific beer of the
      beer list. If you feel the urge to edit or delete your notes, you can do
      so.
    </p>
    <div class="description__wrapper">
      <button class="description__link">
        <router-link v-bind:to="{ name: 'Favourites' }">
          Go to Favourites
        </router-link>
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DescriptionFavourites'
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
