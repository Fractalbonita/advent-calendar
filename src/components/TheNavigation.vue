<template>
  <nav class="nav">
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/calendar">Calendar</router-link>
      </li>
      <li>
        <router-link to="/favorites">Favorites</router-link>
      </li>
      <li>
        <router-link to="/beers">Beers</router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: space-evenly;
  position: sticky;
  top: 0;
  background-color: white;
  border-bottom: 1px solid $primary-color;
  z-index: 1;

  ul {
    list-style: none;
    padding: 0;
  }
  li {
    display: inline-block;
  }
  a {
    font-weight: bold;
    color: $secondary-color;
    padding: 10px;
    text-decoration: none;

    &.router-link-exact-active {
      text-decoration: underline;
      color: $primary-color;
    }
  }
}
</style>
