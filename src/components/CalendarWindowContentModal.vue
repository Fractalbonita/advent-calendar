<template>
  <BaseModal v-bind:closeModal="close" v-bind:scrollable="scrollable">
    <template v-slot:header>
      <div class="header">
        <p class="header__overline">{{ brewery }}</p>
        <h1 class="header__headline-1">{{ name }}</h1>
      </div>
    </template>
    <template v-slot:main>
      <div class="main">
        <div class="main__image">
          <div class="main__image_container">
            <img v-bind:src="image" alt="Awarded beer" />
          </div>
          <p class="main__image_subtitle-1">{{ award }}</p>
          <p class="main__image_subtitle-2">{{ year }}</p>
        </div>
        <div class="main__description">
          <p class="main__description_text">{{ tastingNote }}</p>
          <h2 class="main__description_caption">Category</h2>
          <p class="main__description_text">{{ category }}</p>
          <h2 class="main__description_caption">Style</h2>
          <p class="main__description_text">{{ teaste }}</p>
          <h2 class="main__description_caption">Alcohol by volume</h2>
          <p class="main__description_text">{{ abv }}</p>
          <h2 class="main__description_caption">Country</h2>
          <p class="main__description_text">{{ country }}</p>
          <h2 class="main__description_caption">Website</h2>
          <a
            v-bind:href="website"
            target="_blank"
            rel="noopener noreferrer"
            class="main__description_link"
            >{{ website }}</a
          >
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script lang="ts">
import Vue from 'vue';
import BaseModal from './BaseModal.vue';

export default Vue.extend({
  name: 'CalendarWindowContentModal',
  components: {
    BaseModal
  },
  data() {
    return {
      scrollable: true
    };
  },
  props: {
    close: Function,
    image: String,
    award: String,
    year: String,
    name: String,
    brewery: String,
    tastingNote: String,
    category: String,
    country: String,
    teaste: String,
    abv: String,
    website: String
  }
});
</script>

<style lang="scss" scoped>
.header {
  width: 100%;

  &__overline {
    font-size: $overline-size;
    margin: 0.5rem 0;
    text-transform: uppercase;
  }
  &__headline-1 {
    font-size: $headline-1-size;
    margin: 0.5rem 0;
  }
}
.main {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  &__image {
    flex: 1 1 180px;
    overflow: hidden;
    text-align: center;

    &_container {
      height: 240px;
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
      font-size: $subtitle-1-size;
      font-weight: bold;
      margin: 1rem 0 0.5rem 0;
    }
    &_subtitle-2 {
      font-size: $subtitle-2-size;
      margin: 0.5rem 0 1rem 0;
    }
  }
  &__description {
    flex: 1 2 270px;
    overflow: hidden;

    &_caption {
      font-size: $caption-size;
      margin: 1rem 0 0.5rem;
    }
    &_text {
      font-size: $body-size;
      margin: 0;
    }
    &_link {
      color: inherit;
      text-decoration: none;

      &:hover,
      &:focus {
        color: $primary-color;
        font-size: $headline-2-size;
      }

      &:active {
        color: $primary-color;
        font-size: $headline-2-size;
        font-weight: bold;
      }
    }
  }
}
</style>
