<template>
  <BaseModal v-bind:closeModal="close" v-bind:scrollable="false">
    <template v-slot:header
      ><h1>{{ name }}</h1>
      <p>{{ brewery }}</p></template
    >
    <template v-slot:main>
      <p>Image</p>
      <p>{{ category }}</p>
      <p>{{ award }}</p>
      <p>{{ year }}</p>
      <p>{{ teaste }}</p>
      <p>{{ abv }}</p>
      <p>{{ country }}</p>
      <p>{{ tastingNote }}</p>
      <a v-bind:href="website" target="_blank" rel="noopener noreferrer">{{
        website
      }}</a>
    </template>
  </BaseModal>
</template>

<script lang="ts">
import Vue from 'vue';
import BaseModal from './BaseModal.vue';

export default Vue.extend({
  name: 'CalendarWindowContentModal',
  components: {
    BaseModal
  },
  props: {
    close: Function,
    award: String,
    year: String,
    name: String,
    brewery: String,
    tastingNote: String,
    category: String,
    country: String,
    teaste: String,
    abv: String,
    website: String
  }
});
</script>

<style lang="scss" scoped></style>
