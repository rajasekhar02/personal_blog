<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">changed for checking deploy</router-link>
      <router-link to="/home">About</router-link>
      <router-link to="/vScroller">Scroller</router-link>
      <router-link to="/agGridDemo">AG Grid</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
@import "../node_modules/ag-grid-community/dist/styles/ag-theme-alpine.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
    &+a:before{
      content:'|';
      padding: 0px 10px;
    }
  }
}
</style>
