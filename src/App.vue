<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">GRID PAINTER</router-link> |
      <router-link to="/output">OUTPUT</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #424950;
  height: 100vh;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #adb6c0;

    &.router-link-exact-active {
      color: white;
    }
    &:hover {
      text-decoration: none;
    }
  }
}
</style>
