<template>
  <div>
    <p>There are {{ beers.length }} beers to give a taste.</p>
    <ul>
      <li v-for="beer in beers" v-bind:key="beer.id">
        <router-link
          v-bind:to="{ name: 'BeerDetails', params: { slug: beer.slug } }"
        >
          <img v-bind:src="getImage(beer)" v-bind:alt="beer.name" />
          <p>{{ beer.brewery }}</p>
          <h1>{{ beer.name }}</h1>
          <h2>Category</h2>
          <p>{{ beer.category }}</p>
          <h2>Style</h2>
          <p>{{ beer.style }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Beer from './Beer';

export default Vue.extend({
  name: 'BeerList',
  data() {
    return {
      beers: [] as Beer[]
    };
  },
  created() {
    fetch(process.env.VUE_APP_BEER_API_URL + '/beers')
      .then(res => res.json())
      .then((beers: Beer[]) => (this.beers = beers))
      .catch(error => console.log(error.message));
  },
  methods: {
    getImage(beer: Beer) {
      if (!beer.image) {
        return (
          process.env.VUE_APP_BEER_IMAGES_URL +
          '/assets/images/gonzalo-remy-JCIJnIXv7SE-unsplash.jpg'
        );
      } else {
        return process.env.VUE_APP_BEER_IMAGES_URL + beer.image;
      }
    }
  }
});
</script>
