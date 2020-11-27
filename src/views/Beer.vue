<template>
  <div id="beer">
    <BaseButtonBack />
    <BeerDetails v-bind:slug="slug" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BaseButtonBack from '../components/ui/BaseButtonBack.vue';
import BeerDetails from '../components/BeerDetails.vue';

export default Vue.extend({
  name: 'Beer',
  components: {
    BaseButtonBack,
    BeerDetails
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  }
});
</script>
