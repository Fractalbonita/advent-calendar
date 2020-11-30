<template>
  <div id="home">
    <TheHeader title="The 24 Beers of Christmas Advent Calendar" />
    <DescriptionCalendar />
    <DescriptionBeerList />
    <DescriptionFavourites />
    <DescriptionLegalAge />
    <TheFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TheHeader from '../components/layout/TheHeader.vue';
import DescriptionCalendar from '../components/DescriptionCalendar.vue';
import DescriptionBeerList from '../components/DescriptionBeerList.vue';
import DescriptionFavourites from '../components/DescriptionFavourites.vue';
import DescriptionLegalAge from '../components/DescriptionLegalAge.vue';
import TheFooter from '../components/layout/TheFooter.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    TheHeader,
    DescriptionCalendar,
    DescriptionBeerList,
    DescriptionFavourites,
    DescriptionLegalAge,
    TheFooter
  }
});
</script>

<style lang="scss" scoped>
#home {
  padding: 20px;
}
</style>
