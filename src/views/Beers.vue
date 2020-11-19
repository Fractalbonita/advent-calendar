<template>
  <div id="beers">
    <TheHeader title="German craft beer award winners" />
    <BeerList />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TheHeader from '../components/layout/TheHeader.vue';
import BeerList from '../components/BeerList.vue';

export default Vue.extend({
  name: 'Beers',
  components: {
    TheHeader,
    BeerList
  }
});
</script>
