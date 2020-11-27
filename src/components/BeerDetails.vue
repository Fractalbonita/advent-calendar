<template>
  <div>
    <div>
      <p>{{ beer.brewery }}</p>
      <h1>{{ beer.name }}</h1>
      <img v-bind:src="getImage()" v-bind:alt="beer.name" />
      <h2>Award</h2>
      <p>{{ beer.award }}</p>
      <h2>Year</h2>
      <p>{{ beer.year }}</p>
      <p>{{ beer.tastingNote }}</p>
      <h2>Category</h2>
      <p>{{ beer.category }}</p>
      <h2>Style</h2>
      <p>{{ beer.style }}</p>
      <h2>Alcohol by volume</h2>
      <p>{{ beer.abv }}</p>
      <h2>Country</h2>
      <p>{{ beer.country }}</p>
      <h2>Website</h2>
      <a v-bind:href="beer.website" target="_blank" rel="nopener noreferrer">{{
        beer.website
      }}</a>
    </div>
    <h2>Comments</h2>
    <BeerComment v-if="beer.id" v-bind:beer="beer" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Beer from './Beer';
import BeerComment from './BeerComment.vue';

export default Vue.extend({
  name: 'BeerDetails',
  components: {
    BeerComment
  },
  data() {
    return {
      beer: {} as Beer
    };
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  created() {
    fetch(process.env.VUE_APP_BEER_API_URL + '/beers?slug=' + this.slug)
      .then(res => res.json())
      .then((beers: Beer[]) => (this.beer = beers[0]))
      .catch(error => console.log(error.message));
  },
  methods: {
    getImage() {
      return (
        process.env.VUE_APP_BEER_IMAGES_URL +
        (this.beer.image ||
          '/assets/images/gonzalo-remy-JCIJnIXv7SE-unsplash.jpg')
      );
    }
  }
});
</script>
