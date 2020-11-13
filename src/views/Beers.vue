<template>
  <BeerList />
</template>

<script lang="ts">
import Vue from 'vue';
import BeerList from '../components/BeerList.vue';

export default Vue.extend({
  name: 'Beers',
  components: {
    BeerList
  }
});
</script>
