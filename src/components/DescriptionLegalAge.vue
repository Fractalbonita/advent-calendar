<template>
  <section>
    <blockquote class="quote__text">
      <p>
        According to the <cite class="quote__cite">German JuSchG §9</cite> you
        have to be over 16 years to consume beer.
      </p>
      <footer>
        Further information see
        <a
          href="https://www.gesetze-im-internet.de/juschg/__9.html"
          target="_blank"
          rel="noopener noreferrer"
          class="quote__link"
          >Jugendschutzgesetz (JuSchG)</a
        >
      </footer>
    </blockquote>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DescriptionLegalAge'
});
</script>

<style lang="scss" scoped>
.quote {
  &__text {
    font-size: $overline-size;
    font-weight: normal;
    letter-spacing: 0.1rem;
    line-height: 1.5;
    margin: 0.5rem 1rem;
    text-align: center;
  }
  &__link {
    color: inherit;
    text-decoration: none;

    &:hover,
    &:focus {
      color: $primary-color;
    }
    &:acitve {
      color: $primary-color;
      border-bottom: 1px solid $primary-color;
    }
  }
}
</style>
