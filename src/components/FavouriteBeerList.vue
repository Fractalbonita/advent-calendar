<template
  ><div>
    <p v-if="favorites.length === 0" key="favorites-empty">
      You haven't any favorite beers yet. Add beers by tapping on the heart
      icon.
    </p>
    <ul v-else key="favorites-exist">
      <li
        v-for="favorite in favorites"
        v-bind:key="favorite.index"
        v-bind:class="{ highlighted: favorite.tasted }"
      >
        {{ favorite.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'FavouriteBeerList',
  data() {
    return {
      favorites: [
        {
          name: 'My',
          tasted: true
        },
        {
          name: 'First',
          tasted: false
        },
        {
          name: 'Beer',
          tasted: true
        }
      ]
    };
  }
});
</script>

<style lang="scss" scoped>
.highlighted {
  color: $primary-color;

  &::after {
    content: 'tasted';
    color: black;
    font-size: 10px;
    font-weight: bold;
  }
}
</style>
