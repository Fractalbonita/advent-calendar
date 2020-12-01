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
  position: relative;
}
@media screen and (max-width: 575.98px) {
  #home::after {
    content: '';
    background: top / contain no-repeat url('../assets/images/Logo.png');
    opacity: 0.5;
    top: 25vh;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }
}
@media screen and (max-width: 767.98px) {
  #home::after {
    content: '';
    background: top / contain no-repeat url('../assets/images/Logo.png');
    opacity: 0.5;
    top: 20vh;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }
}
@media screen and (max-width: 991.98px) {
  #home::after {
    content: '';
    background: top / contain no-repeat url('../assets/images/Logo.png');
    opacity: 0.5;
    top: 5vh;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }
}
@media screen and (max-width: 1199.98px) {
  #home::after {
    content: '';
    background: center / contain no-repeat url('../assets/images/Logo.png');
    opacity: 0.5;
    top: 2vh;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }
}

@media screen and (min-width: 1200px) {
  #home::after {
    content: '';
    background: center / contain no-repeat url('../assets/images/Logo.png');
    opacity: 0.5;
    top: 5vh;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }
}
</style>
