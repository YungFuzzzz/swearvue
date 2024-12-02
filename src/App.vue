<template>
  <div id="app">
    <!-- Voeg hier een navigatielink toe als je wilt -->
    <nav>
      <router-link to="/">HOME</router-link>
      <router-link to="/orders">ORDERS</router-link>
    </nav>

    <!-- Dit is de plaats waar de inhoud van de huidige route wordt weergegeven -->
    <router-view></router-view>
  </div>
</template>

<script>
// Hier hoef je verder niets te doen, de router wordt automatisch geïmporteerd in main.js
export default {
  name: 'App'
}
</script>

<style>
/* Basisstijl, je kunt het aanpassen zoals je wilt */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  margin-bottom: 20px;
}

nav a {
  margin: 0 15px;
  text-decoration: none;
  color: #42b983;
}
</style>