<template>
  <nav class="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/calendar">Calendar</router-link>
    <router-link to="/favorites">Favorites</router-link>
    <router-link to="/beers">Beers</router-link>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    padding: 0 10px;
    text-decoration: none;

    &.router-link-exact-active {
      text-decoration: underline;
      color: #42b983;
    }
  }
}
</style>
