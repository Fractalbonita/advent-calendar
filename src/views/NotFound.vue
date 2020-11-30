<template>
  <div id="notfound" class="notfound">
    <h1 class="notfound__headline">404</h1>
    <BaseIcon icon-name="beer" width="72" height="72" class="notfound__icon">
      <IconBeerMug />
    </BaseIcon>
    <h2 class="notfound__subheadline">Page not found.</h2>
    <p class="notfound__text">
      Please go back
    </p>
    <router-link v-bind:to="{ name: 'Home' }" class="notfound__link">
      Home
    </router-link>
    <TheFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BaseIcon from '../components/ui/BaseIcon.vue';
import IconBeerMug from '../components/icons/IconBeerMug.vue';
import TheFooter from '../components/layout/TheFooter.vue';

export default Vue.extend({
  name: 'NotFound',
  components: {
    BaseIcon,
    IconBeerMug,
    TheFooter
  }
});
</script>

<style lang="scss" scoped>
#notfound {
  padding: 20px;
}
.notfound {
  text-align: center;

  &__headline {
    color: $primary-color;
    font-family: 'Lobster';
    font-size: 3rem;
    font-weight: bold;
    margin: 1rem 0;
  }
  &__icon {
    fill: $text-color;
    margin: 0.5rem 0;
    stroke: $background-color;
  }
  &__subheadline {
    font-family: 'Cabin';
    font-size: $headline-2-size;
    font-weight: bold;
    margin: 1rem 0;
    text-transform: uppercase;
  }
  &__text {
    font-family: 'Cabin';
    font-size: $headline-3-size;
    font-weight: normal;
    margin: 0.5rem 0 1rem;
  }
  &__link {
    color: $primary-color;
    text-decoration: none;
    font-size: $headline-3-size;
    font-weight: normal;

    &:hover,
    &:focus {
      color: $secondary-color;
      font-size: $headline-2-size;
    }
    &:active {
      border-bottom: 1px solid $secondary-color;
    }
  }
}
</style>
