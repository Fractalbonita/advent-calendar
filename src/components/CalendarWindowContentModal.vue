<template>
  <BaseModal v-bind:closeModal="close" v-bind:scrollable="scrollable">
    <template v-slot:header>
      <div class="header">
        <p class="header__overline">{{ beer.brewery }}</p>
        <h1 class="header__headline">{{ beer.name }}</h1>
        <button
          type="button"
          aria-label="Close modal"
          v-on:click="close"
          class="header__button--close"
        >
          <BaseIcon icon-name="close" width="24" height="24">
            <IconClose />
          </BaseIcon>
        </button>
      </div>
    </template>
    <template v-slot:main>
      <div class="main">
        <div class="main__image">
          <div class="main__image_container">
            <img v-bind:src="getImage()" v-bind:alt="beer.name" />
          </div>
          <p class="main__image_subtitle-1">{{ beer.award }}</p>
          <p class="main__image_subtitle-2">{{ beer.year }}</p>
        </div>
        <div class="main__description">
          <p class="main__description_text">{{ beer.tastingNote }}</p>
          <h2 class="main__description_caption">Category</h2>
          <p class="main__description_text">{{ beer.category }}</p>
          <h2 class="main__description_caption">Style</h2>
          <p class="main__description_text">{{ beer.style }}</p>
          <h2 class="main__description_caption">Alcohol by volume</h2>
          <p class="main__description_text">{{ beer.abv }}</p>
          <h2 class="main__description_caption">Country</h2>
          <p class="main__description_text">{{ beer.country }}</p>
          <h2 class="main__description_caption">Website</h2>
          <a
            v-bind:href="beer.website"
            target="_blank"
            rel="noopener noreferrer"
            class="main__description_link"
            >{{ beer.website }}</a
          >
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import Beer from './Beer';
import BaseModal from './ui/BaseModal.vue';
import BaseIcon from './ui/BaseIcon.vue';
import IconClose from './icons/IconClose.vue';

export default Vue.extend({
  name: 'CalendarWindowContentModal',
  components: {
    BaseModal,
    BaseIcon,
    IconClose
  },
  data() {
    return {
      scrollable: true
    };
  },
  props: {
    close: Function,
    beer: { type: Object as PropType<Beer> }
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
.header {
  position: relative;
  width: 100%;

  &__overline {
    font-size: $overline-size;
    font-weight: normal;
    margin: 0;
    padding: 0.5rem 0 0;
    text-transform: uppercase;
  }
  &__headline {
    color: $primary-color;
    font-family: 'Lobster';
    font-size: $headline-1-size;
    font-weight: bold;
    margin: 0;
    padding: 0.5rem 0;
  }
  &__button--close {
    background-color: transparent;
    border: none;
    cursor: pointer;
    fill: $text-color;
    font-size: $button-size;
    height: 36px;
    position: absolute;
    right: 0;
    stroke: transparent;
    top: 0px;
    width: 36px;

    &:hover,
    &:focus {
      fill: $primary-color;
      stroke: $primary-color;
    }
    &:active {
      fill: $primary-color;
      stroke: $primary-color;
      opacity: 0.5;
    }
    & svg {
      left: 6px;
      position: absolute;
      top: 6px;
    }
  }
}
.main {
  display: flex;
  flex-flow: row wrap;

  &__image {
    flex: 1 1 180px;
    overflow: hidden;
    text-align: center;

    &_container {
      background-color: $text-color;
      border: 20px solid;
      border-image: repeating-linear-gradient(
          30deg,
          $beer-9-color,
          $beer-30-color 15px
        )
        60;
      height: 240px;
      margin: 0 25px;
      overflow: hidden;
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
    &_subtitle-1 {
      color: $primary-color;
      font-size: $subtitle-1-size;
      font-weight: bold;
      margin: 1rem 0 0.5rem 0;
    }
    &_subtitle-2 {
      font-size: $subtitle-2-size;
      font-weight: normal;
      margin: 0.5rem 0 1rem 0;
    }
  }
  &__description {
    flex: 1 2 270px;
    overflow: hidden;

    &_caption {
      font-size: $caption-size;
      font-weight: bold;
      margin: 1rem 0 0.2rem;
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
</style>
