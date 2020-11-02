<template>
  <div>
    <ul>
      <li
        v-for="beer in beers"
        v-bind:key="beer.id"
        v-on:click="toggle(beer.id)"
      >
        <div v-if="isVisible.includes(beer.id)">
          <p>{{ beer.id }}</p>
          <h2>{{ beer.name }}</h2>
          <h3>{{ beer.category }}</h3>
          <p>{{ beer.brewery }}</p>
        </div>
        <div class="calendar__window--closed" v-else>
          <h2>{{ beer.id }}</h2>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CalendarWindow',
  data: () => ({
    isVisible: [] as string[],
    beers: []
  }),
  created() {
    fetch(process.env.VUE_APP_BEER_API_URL)
      .then(res => res.json())
      .then(beers => {
        this.beers = beers.slice(0, 24);
      })
      .catch(error => console.log(error.message));
  },
  methods: {
    toggle(id: string) {
      this.isVisible.includes(id)
        ? this.isVisible.splice(this.isVisible.indexOf(id), 1)
        : this.isVisible.push(id);
    }
  }
});
</script>

<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
h2 {
  color: #42b983;
}
.calendar__window--closed {
  border: 1px solid #42b983;
  text-align: center;
  height: 100px;
  width: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  h2 {
    color: #42b983;
  }
}
.calendar__window--open {
  border: 1px solid #42b983;
}
</style>
