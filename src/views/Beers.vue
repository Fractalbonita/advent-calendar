<template>
  <div id="beers">
    <TheHeader title="German craft beer award winners" />
    <BeerList />
    <BaseScrollToTop />
    <TheFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TheHeader from '../components/layout/TheHeader.vue';
import BeerList from '../components/BeerList.vue';
import BaseScrollToTop from '../components/ui/BaseScrollToTop.vue';
import TheFooter from '../components/layout/TheFooter.vue';

export default Vue.extend({
  name: 'Beers',
  components: {
    TheHeader,
    BeerList,
    BaseScrollToTop,
    TheFooter
  }
});
</script>

<style lang="scss" scoped>
#beers {
  padding: 20px;
}
</style>
