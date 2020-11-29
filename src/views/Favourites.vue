<template>
  <div id="favourites">
    <TheHeader title="My favourite beers" />
    <FavouriteBeerList />
    <BaseScrollToTop />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TheHeader from '../components/layout/TheHeader.vue';
import FavouriteBeerList from '../components/FavouriteBeerList.vue';
import BaseScrollToTop from '../components/ui/BaseScrollToTop.vue';

export default Vue.extend({
  name: 'Favourites',
  components: {
    TheHeader,
    FavouriteBeerList,
    BaseScrollToTop
  }
});
</script>

<style lang="scss" scoped>
#favourites {
  padding: 20px;
}
</style>
