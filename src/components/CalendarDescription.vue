<template>
  <section>
    <p>
      Treat your taste buds during the festive season and explore a new craft
      beer each day from the 1st to the 24th December.
    </p>
    <p>
      Behind each window is a winning product of the
      <a
        href="http://www.worldbeerawards.com/"
        target="_blank"
        rel="noopener noreferrer"
        >World Beer Awards</a
      >
      of 2020 and 2019. Different types and styles of beers are randomly
      selected encompassing specialty beers, pale ales, IPAs, dark beers,
      flavoured beers as well as stouts and porters brewed in Germany.
    </p>
    <p>Cheers!</p>
    <blockquote>
      <p>
        According to the <cite>German JuSchG §9</cite> you have to be 16 years
        to consume beer.
      </p>
      <footer>
        Further information see
        <a
          href="https://www.gesetze-im-internet.de/juschg/__9.html"
          target="_blank"
          rel="noopener noreferrer"
          >Jugendschutzgesetz (JuSchG)</a
        >
      </footer>
    </blockquote>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CalendarDescription'
});
</script>

<style lang="scss" scoped>
p {
  font-size: $body-size;
}
</style>
