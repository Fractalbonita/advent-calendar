<template>
  <div>
    <p class="footer__copyright">&copy; 2020 Fractalbonita</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Footer'
});
</script>

<style lang="scss" scoped>
.footer {
  &__copyright {
    font-size: $overline-size;
    font-weight: normal;
    text-align: center;
    margin: 2rem 0 1rem;
  }
}
</style>
