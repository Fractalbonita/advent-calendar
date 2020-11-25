<template>
  <div id="favourites">
    <TheHeader title="My favourite beers" />
    <FavouriteBeerList />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TheHeader from '../components/layout/TheHeader.vue';
import FavouriteBeerList from '../components/FavouriteBeerList.vue';

export default Vue.extend({
  name: 'Favourites',
  components: {
    TheHeader,
    FavouriteBeerList
  }
});
</script>
