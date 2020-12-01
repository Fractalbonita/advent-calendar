<template>
  <div>
    <section>
      <p class="description__intro">
        Treat your taste buds during the festive season and explore a new craft
        beer each day from the 1st to the 24th December.
      </p>
      <p class="description__text">
        Behind each <span class="description__highlight">Calendar</span> window
        is an award-winning product of the
        <a
          href="http://www.worldbeerawards.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="description__link--external"
          >World Beer Awards
        </a>
        of 2020 and 2019. Different types and styles of beers are randomly
        selected encompassing specialty beers, pale ales, IPAs, dark beers,
        flavoured beers as well as stouts and porters brewed in Germany.
      </p>
      <p class="description__text">
        Tapping on the name of the beer will reveal a dialog with further facts
        about the beer.
      </p>
      <p class="description__greeting">Cheers!</p>
      <div class="description__wrapper">
        <button class="description__link">
          <router-link v-bind:to="{ name: 'Calendar' }">
            Go to Calendar
          </router-link>
        </button>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DescriptionCalendar'
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
  &__intro {
    font-size: $headline-2-size;
    font-weight: normal;
    line-height: 1.5;
    margin: 1rem 0;
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
  &__greeting {
    font-size: $headline-3-size;
    font-weight: normal;
    line-height: 1.5;
    margin: 1rem 0;
    text-align: center;
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
  &__link--external {
    color: $secondary-color;
    font-size: $body-size;
    font-weight: normal;
    letter-spacing: 0.1rem;
    text-decoration: none;

    &:hover,
    &:focus {
      color: $secondary-color;
    }
    &:active {
      color: $secondary-color;
      border-bottom: 1px solid $secondary-color;
    }
  }
}
</style>
