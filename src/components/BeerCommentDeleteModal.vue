<template>
  <BaseModal v-bind:closeModal="close" v-bind:scrollable="scrollable">
    <template v-slot:main
      ><p>
        Are you sure you want to delete this comment permanently?
      </p></template
    >
    <template v-slot:footer>
      <button type="button" v-on:click="$emit('cancel')">Cancel</button
      ><button type="button" v-on:click="$emit('delete')">
        Delete
      </button>
    </template>
  </BaseModal>
</template>

<script lang="ts">
import Vue from 'vue';
import BaseModal from './ui/BaseModal.vue';

export default Vue.extend({
  name: 'BeerDeleteModal',
  components: {
    BaseModal
  },
  data() {
    return {
      scrollable: false
    };
  },
  props: {
    close: Function
  }
});
</script>
