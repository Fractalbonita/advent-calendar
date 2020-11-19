<template>
  <button typ="button" v-on:click="goBack" class="button">
    Go back
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseButtonBack',
  methods: {
    goBack() {
      return this.$router.go(-1);
    }
  }
});
</script>

<style lang="scss" scoped>
.button {
  background-color: transparent;
  border: 0;
  cursor: pointer;
}
</style>
