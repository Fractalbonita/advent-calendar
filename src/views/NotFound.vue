<template>
  <div>
    <h1>404</h1>
    <h2>Page not found.</h2>
    <p>
      Please go back
    </p>
    <router-link v-bind:to="{ name: 'Home' }">Home</router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'NotFound'
});
</script>
